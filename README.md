# S3 Redirects
Manage S3 redirects using NodeJS

### Hosting using S3
If you are hosting websites using S3 bucket hosting, you will need to manage redirects using files with metadata to handle 301 redirects.
This repo includes code to manage these redirects by creating the necessary files from a .csv file.

### Requirements
Ensure you have AWS CLI tools installed and configured with the keys needed to access your account. Additionally NodeJS will need to be installed.


### Running
Change the __S3Bucket__ variable to point to your bucket name. Run from the command line with:

```
node index.js
```

There is also sample code to read redirects from your S3 bucket, but by default this script only writes the redirects from your .csv file. 
