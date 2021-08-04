#!/bin/bash
echo convert $1 -resize 480x480^ -gravity center -extent 480x480  resized-$1.jpg
convert $1 -resize 480x480^ -gravity center -extent 480x480  resized-$1.jpg
