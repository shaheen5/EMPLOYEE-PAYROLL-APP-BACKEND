#!/bin/bash -x

cd /home/ubuntu/Employee_Payroll_App_BackEnd
working_directory=$(pwd)
echo "Present working directory = $working_directory"
npm i
echo "Installing packages"
npm start
