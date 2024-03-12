import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as path from 'path';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsCdkTsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    // Create S3 bucket
    const bucket = new s3.Bucket(this, 'MyBucket', {
      bucketName: 'my-bucket-name', // Specify your bucket name here
      removalPolicy: cdk.RemovalPolicy.DESTROY // Only for demonstration purposes, consider removing or modifying for production
    });
    // Define Lambda function
    const myLambda = new lambda.Function(this, 'MyLambdaFunction', {
      runtime: lambda.Runtime.,
      handler: 'main',
      code: lambda.Code.fromAsset('./bin/test'),
      description: 'My Lambda Function',
      timeout: cdk.Duration.seconds(30),
      memorySize: 256,
      environment: {
        KEY: 'VALUE'
      }
    })

    // Upload static folder contents to S3 bucket
    new s3deploy.BucketDeployment(this, 'DeployStaticAssets', {
      sources: [s3deploy.Source.asset(path.join(__dirname, '..', 'static'))],
      destinationBucket: bucket
    });
  }
}
const app = new cdk.App();
new AwsCdkTsStack(app, 'MyLambdaStack');
app.synth();
