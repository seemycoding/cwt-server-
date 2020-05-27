#!/bin/bash

set -e
DB=cwt
SPACE_NAME=/var/uploads/cwt
FILE="$@"
date
echo "Restoring MongoDB database"
echo "$@"
echo "Restoring $DB database to mongodb databasse "
mongorestore --username "cwtuser" --password "VegasDreams##1" --authenticationDatabase cwt --authenticationMechanism SCRAM-SHA-256 --archive=$SPACE_NAME/$FILE --gzip

echo 'Backup complete!'


