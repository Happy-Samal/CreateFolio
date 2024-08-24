import mongoose from 'mongoose'

const portfolioSchema = new mongoose.Schema({
    username:String,
    userInfo:{greet:String,name:String,udesc:String},
    images:{cover:String,profile:String,resume:String},
    whoiam:{about:String,wdesc:String},
    personalInfo:{birth:String,email:String,phone:String,address:String ,github:String,facebook:String,instagram:String,linkedin:String},
    expertise:[{main:String,sub:String}],
    project:[{pname:String,puse:String,plink:String,pimage:String}],
    skill:[{slang:String,spercentage:String}],
    language:[{llang:String,lpercentage:String}]
});

const Portfolio = mongoose.model('portfolio', portfolioSchema);

export default Portfolio