# Welcome to your Cloud Development Kit (CDK) TypeScript project!
#### Kicked off with your very own CICD pipeline


This is a CDK stack designed to help you create a CDK app using a CICD pipeline. For those who just want to get to it the directions are under [Walkthrough](#walkthrough). If you are unsure of anything check the [Prerequisite](#prerequisite)

###### Why use this repo?
> If you're playing around with the CDK alot, you’ll want to have a solid starting point.
> This guide acts as starting point that can be where you kick off from!


### Introduction

There is a lot of information out there about the CDK. Official workshops, one off guides, blogposts, and they all show great stuff. When learning any new technology or framework practice makes perfect and what better way to practice then the iteration of building, deploying, breaking, and eventually success! That’s where this guide hopes to help. It provides an approach to learning the CDK that aims to be the base for any future CDK material you consume. 


### Where to build

In the spirt of true iteration this guide recommends you use some sort of containerized dev environment so that if you install or uninstall the wrong packages its no big deal and you can just get rid of that environment.
Not sure how to do this? Here’s an example of how to [create a dev container with Visual studio code](https://code.visualstudio.com/docs/remote/create-dev-container)

### Cloud Development Kit (CDK) background info

The AWS Cloud Development Kit (AWS CDK) is an open source framework that allows you to deploy AWS infrastructure as code. 
Here are a few links with background information if you want to know more
* [AWS Docs](https://docs.aws.amazon.com/cdk/latest/guide/home.html)
* [API Referance](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-construct-library.html)
* [Git Hub Repo](https://github.com/aws/aws-cdk)
* [AWS CDK Page](https://aws.amazon.com/cdk/)


### Prerequisite
* Have an [AWS Account](https://aws.amazon.com/free/?trk=ps_a131L0000085DvcQAE&trkCampaign=acq_paid_search_brand&sc_channel=ps&sc_campaign=acquisition_US&sc_publisher=google&sc_category=core&sc_country=US&sc_geo=NAMER&sc_outcome=acq&sc_detail=create%20aws%20account&sc_content=Account_e&sc_segment=432339156165&sc_medium=ACQ-P|PS-GO|Brand|Desktop|SU|AWS|Core|US|EN|Text&s_kwcid=AL!4422!3!432339156165!e!!g!!create%20aws%20account&ef_id=Cj0KCQjw7MGJBhD-ARIsAMZ0eeu0jMltAUoZ4LWwhQMnwQRGiLmHj2mdOFZzRR_zZ99KUDYgJfUJIN0aApNZEALw_wcB:G:s&s_kwcid=AL!4422!3!432339156165!e!!g!!create%20aws%20account) and [Github Account](https://github.com/join)
* Install [the AWS Cli](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
* Create [programmatic credentials](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html) and [configure](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) them
* Check out the [Where to build section](#where-to-build) and [install](https://docs.aws.amazon.com/cdk/latest/guide/cli.html) the AWS CDK

### Walkthrough
###### Empty pipeline

1. Step one is to do a local clone of this repository `git clone https://github.com/QuinnPipeline/pipeline_kickoff.git`
2. [Create a github](https://docs.github.com/en/get-started/quickstart/create-a-repo) repo on github
    * You should create two
        *One for the pipeline kickoff (recommended that this repo is private)
        *One for your new CDK app (recommended that this repo is private)
3. Delete the local .git and .gitignore folders in your cloned repo of pipeline_kickoff
4. Run the following commands in your local clone of pipeline_kickoff to make it your own
    * `git init -b main`
    * `git add -A .`
    * `git commit -m "first commit"`
    * `git remote add origin git@github.com:<your_git_user_name>/pipeline_kickoff`
    * `git push -u origin master`
5. Edit the pipeline_kickoff/bin/pipeline_kickoff.ts 
    *You will have to put in your account number and pick the region you want you deploy to
6. And pipeline_kickoff/bin/pipeline_kickoff.ts
    *Edit line 10 and add your github source info `const git_source = ' ' //'OWNER/REPO' format`
7. You'll also need to create a [github token](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token) with the repo and admin:repo_hook permissions and store it as a [plaintext secret](https://docs.aws.amazon.com/secretsmanager/latest/userguide/manage_create-basic-secret.html) under the name github-token.
![PlaintextSecretExample](https://raw.githubusercontent.com/QuinnPipeline/pipeline_kickoff/main/images/plaintext_secret.JPG)

8. Run `npx cdk synth` and `npm run build` to check for errors and see if you are missing packages
    *install packages via `npm install '@aws-cdk/<package_name>'`
    *If you're getting any package version errors try [updateing](https://aws-CDK.com/aws-CDK-upgrade-all-packages/) all your packages to the current version
9. Bootstrap your CDK environment so you can deploy the pipeline kickoff 
    * You have to bootstrap for ever region you deploy into `npx cdk bootstrap aws://ACCOUNT-NUMBER-1/REGION-1 aws://ACCOUNT-NUMBER-2/REGION-2 ...`
10. One final commit now that your pipeline is fully configured
    * `git add -A .`
    * `git commit -m "final commit"`
    * `git push`
You now have an example of an empty pipeline. You can deploy it with `npx cdk deploy` to see how it works in [The CodePipeline Console](https://console.aws.amazon.com/codesuite/codepipeline/pipelines)

###### Customize your pipeline

1. Navigate into your other local repo 
2. Create your own CDK app. `npx CDK init app --language=typescript`
3. Add the following to the CDK.json file `"@aws-cdk/core:newStyleStackSynthesis": true`
    * This will allow your app to use the new bootstrapping method
4. Take a look at your pipeline kickoff project
    * Pay attention to a few things about the layout of the files and folder structure 
    ![filefolderlayoutpic](https://raw.githubusercontent.com/QuinnPipeline/pipeline_kickoff/main/images/filefolderlayout.JPG)
    * You'll notice a clear line of reference for how the files interact with each other. If you look inside each file you'll see this reference expressed via the import function.
    * You can use this layout as a reference while writing your own app
5. Compare your new apps layout to the pipeline_kickoff layout
    * You can see how to start your build from there, more prescriptive guidance to come!

### Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `npx CDK deploy`      deploy this stack to your default AWS account/region
 * `npx CDK diff`        compare deployed stack with current state
 * `npx CDK synth`       emits the synthesized CloudFormation template
 * `npx CDK init <options>` best way to start a new project
