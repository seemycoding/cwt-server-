var cp = require("child_process");
var cron = require("node-cron");
const fs = require("fs");
const path=require('path');


const BackupController = {
  getBackup: async (req, res, next) => {
    let data = [];
    fs.readdir("/var/uploads/backup/", (err, files) => {
      files.forEach((file) => {
        const date = file.split(".");
        data.push(date[0]);
      });
      console.log(data);

      res.json({ Data: data });
    });
  },
  setBackup: async (req, res, next) => {
    console.log(req.body);

    // restore
    if (req.body.restore == "on") {
      cp.exec(
        '"/var/uploads/backup/cwt_restore.sh" ' + req.body.snapshot + ".gz",
        function (err, stdout, stderr) {
          if (err) {
              console.log(err);
              res.redirect(`/backup/?message=${err}`);

          } else {
            res.redirect('/backup/?message=Data Restoration Completed');

          }
        }
      );
    }

    //Immediate backup
    if (req.body.backupnow == "on") {
     
        
      cp.exec(' "/var/uploads/backup/cwt_backup.sh" ', function (err, stdout, stderr) {
        // handle err, stdout, stderr
        if (err) {
            console.log(err);
            res.redirect(`/backup/?message=${err}`);
        } else {
            res.redirect('/backup/?message=Immediate Backup Completed');
 
        }
      });

    }

    //daily backup
    if (req.body["daily-time"] != "") {
      const time = req.body["daily-time"].split(":");
      const hour = time[0];
      const minute = time[1];

      cron.schedule(`${minute} ${hour} * * 1-6`, () => {
        console.log("Backup Complete");
        cp.exec('"/var/uploads/backup/cwt_backup.sh"', function (err, stdout, stderr) {
          // handle err, stdout, stderr
          if (err) {
            res.redirect(`/backup/?message=${err}`);

              
          } else {
            console.log("Backup Completed");
            

          }
        });
      });
      res.redirect('/backup/?message=Backup Operation Scheduled Successfully');
    }

    //fortnight or monthly
    if (req.body["week-frequency"] != "") {
      const time = req.body["fm-time"].split(":");
      const hour = time[0];
      const minute = time[1];
      let ScheduleFrequency = "* * * * *";
      if (req.body["week-frequency"] == "fortnight") {
        ScheduleFrequency = `${minute} ${hour} 1-31/14 1-12 *`;
      } else {
        if (req.body["week-frequency"] == "monthly") {
          ScheduleFrequency = `${minute} ${hour} 1 1-12 * `;
        }
      }

      cron.schedule(ScheduleFrequency, () => {
        console.log("Backup Complete");
        cp.exec('"/var/uploads/backup/cwt_backup.sh"', function (err, stdout, stderr) {
          // handle err, stdout, stderr
          if (err) {
              console.log(err);
              
          } else {
            console.log("Backup Completed");
            
          }
        });
      });
      res.redirect('/backup/?message=Backup Operation Scheduled Successfully');

    }

    //weekly on any given day
    if (
      req.body["week-date"] != "" &&
      req.body["week-day"] != "" &&
      req.body["week-time"] != ""
    ) {
      const time = req.body["week-time"].split(":");
      const hour = time[0];
      const minute = time[1];
      let ScheduleFrequency = "* * * * *";
      ScheduleFrequency = `${minute} ${hour} * * 1-6/${req.body["week-day"]}`;

      cron.schedule(ScheduleFrequency, () => {
        console.log("Backup Complete");
        cp.exec('"./config/cwt_backup.sh"', function (err, stdout, stderr) {
          // handle err, stdout, stderr
          if (err) {
              console.log(err);
              
          } else {
            console.log("Backup Complete");
            
          }
        });
      });
      res.redirect('/backup/?message=Backup Operation Scheduled Successfully');

    }

    
  },
};
module.exports = BackupController;
