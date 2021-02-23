// node get-amplify-config.js SSM_PARAMETER_NAME

const https = require('https');
const { exec } = require("child_process");
const fs = require('fs');

const args = process.argv;
console.log(args);

const aws_ssm_param_name = args[2]; // 'ampapp-aws-exports'
const save_file_path = "src/aws-exports.js";

exec(`aws ssm get-parameter --name ${aws_ssm_param_name}`, (error, stdout, stderr) => {
    if (error) {
        console.error(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
    }
    console.log(stdout);

    const res = JSON.parse(stdout);
    const value = res.Parameter.Value;
    // process.stdout.write(value);
    
    fs.writeFile(save_file_path, value, function (err,data) {
      if (err) {
        return console.log(err);
      }
      console.log('save aws-exports succeeded');
    });
});
