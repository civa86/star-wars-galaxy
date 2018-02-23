#!/usr/bin/env bash

# TODO: check arguments....
TOKEN=$1
FILE_TO_UPLOAD=$2
GIST_FILE=$3
GIST_ID=$4
CONTENT=$(sed -e 's/\r//' -e's/\t/\\t/g' -e 's/"/\\"/g' "${FILE_TO_UPLOAD}" | awk '{ printf($0 "\\n") }')
read -r -d '' DESC <<EOF
{
  "description": "Lighthouse Audit Report",
  "files": {
    "${GIST_FILE}": {
      "content": "${CONTENT}"
    }
  }
}
EOF

curl -v --request PATCH -H "Authorization: token $TOKEN" -d "${DESC}" "https://api.github.com/gists/$GIST_ID"
