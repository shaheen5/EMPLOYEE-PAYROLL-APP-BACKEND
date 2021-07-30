#!/bin/bash -x

cd /home/ubuntu/Employee_Payroll_App_BackEnd
working_directory=$(pwd)
echo "Present working directory = $working_directory"
pm2 delete 0
npm i
echo "Installing packages"
pm2 --name Employee_Payroll_App_BackEnd start npm -- start
