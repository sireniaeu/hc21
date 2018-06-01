#! /usr/bin/env bash
git remote add vs https://robot:7ij4pd6bqmikip4ixn7hgw4mbkqgrcgrfgvilqulzy6rwhvsjn4a@automation-demo.visualstudio.com/hc21/_git/hc21
git remote add github https://sireniabot:MQJHtOk57Jydn8qqt9De@github.com/sireniaeu/hc21.git
while true
  do
    git pull vs master && git push github master
    git pull github master && git push vs master
  done
