# #!/bin/bash

# set -e

# SPACE_NAME=mongo-backup-demo
# BACKUP_NAME=$(date +%y%m%d_%H%M%S).gz
# DB=test

# date
# echo "Backing up MongoDB database to DigitalOcean Space: $SPACE_NAME"

# echo "Dumping MongoDB $DB database to compressed archive"
# mongodump --db $DB --archive=$HOME/backup/tmp_dump.gz --gzip

# echo "Copying compressed archive to DigitalOcean Space: $SPACE_NAME"
# s3cmd put $HOME/backup/tmp_dump.gz s3://$SPACE_NAME/$BACKUP_NAME

# echo "Cleaning up compressed archive"
# rm $HOME/backup/tmp_dump.gz

# echo 'Backup complete!'

#!/bin/bash

set -e

SPACE_NAME=/var/uploads/cwt
BACKUP_NAME=$(date +%d_%m_%y__%H_%M_%S).gz
DB=cwt

date
echo "Backing up MongoDB database to Specified Space: $SPACE_NAME"

echo "Dumping MongoDB $DB database to compressed archive"
mongodump --db=$DB --archive=$SPACE_NAME/$BACKUP_NAME --gzip



echo 'Backup complete!'