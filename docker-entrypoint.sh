#!/bin/bash
set -e

if [ "$1" = 'npm run start' ]; then
  rm -r /faas/src/function/myF || echo "continue..."
#
#  if [ -z "${GIT_TOKEN}" ]; then
#    git clone "${GIT_CLONE_URL}" /faas/src/function/myF
#  fi
#
#  if [ -z "$(ls -A "$PGDATA")" ]; then
#    gosu postgres initdb
#  fi
#
#  exec gosu postgres "$@"
fi

exec "$@"
