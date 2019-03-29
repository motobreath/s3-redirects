AWS = require("aws-sdk")
var s3 = new AWS.S3();
const csv=require('csvtojson')

/**
 * The path to the redirects.csv file
 */
const csvFilePath='redirects.csv'

/**
 * The bucket to write too
 */
const S3Bucket="www.jwine.com"

/* Read from S3 file, get array of redirect objects. Uses promise .then pattern*/
csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    jsonObj.forEach(redirect=>{
        let redirectOld = redirect.OLD;
        let redirectNew = redirect.NEW;
        writeRedirectToS3(redirectOld,redirectNew,S3Bucket)        

        //now write an index file for each of these so things like /About/ will work
        redirectOld += "/index.html"
        writeRedirectToS3(redirectOld,redirectNew,S3Bucket);
    })
});

/**
 * Write a redirect object to S3
 * @param {String} redirectFrom 
 * @param {String} redirectTo 
 * @param {String} Bucket 
 */
function writeRedirectToS3(redirectFrom,redirectTo,Bucket){

    var params = {
        ACL: "public-read",
        WebsiteRedirectLocation: redirectTo, 
        Bucket: Bucket, 
        Key: redirectFrom
    };
    return s3.putObject(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
        /*
        data = {
        ETag: "\"6805f2cfc46c0f04559748bb039d69ae\"", 
        VersionId: "Bvq0EDKxOcXLJXNo_Lkz37eM3R4pfzyQ"
        }
        */
    });

    
}

/**
 * Read a redirect object from S3
 * @param {String} redirectKey 
 * @param {String} Bucket 
 */
function getRedirect(redirectKey,Bucket){
    var params = {
        Bucket: Bucket, 
        Key: redirectKey
       };
       console.log(params);
       s3.getObject(params, function(err, {data}) {
        if (err) console.log(err, err.stack); // an error occurred
        else    {
            
            console.log(data);  
                 }         // successful response
        /*
        data = {
         AcceptRanges: "bytes", 
         ContentLength: 3191, 
         ContentType: "image/jpeg", 
         ETag: "\"6805f2cfc46c0f04559748bb039d69ae\"", 
         LastModified: <Date Representation>, 
         Metadata: {
         }, 
         TagCount: 2, 
         VersionId: "null"
        }
        */
      });
}