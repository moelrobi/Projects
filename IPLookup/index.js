const got = require('got');
const readline = require('readline');

const rl = readline.createInterface({input: process.stdin, output: process.stdout});

rl.question('Please enter the IPv4 address of the target: ', (answer) => {
    if(answer.split('.').length != 4) {
        throw Error("Invalid IPv4 address entered!");
    }
    got(`https://extreme-ip-lookup.com/json/${answer}`, {json:true})
    .then((response) => {
        console.log(`\nStats of IP Adress: ${answer}\n`);
        console.log(`The IP type is: ${response.body.ipType ? response.body.ipType : "This IP does not have a type!"}`);
        console.log(`The ISP of this IP is: ${response.body.isp ? response.body.isp : "This IP does not have an ISP!"}`);
        console.log(`The country code of the IP is: ${response.body.countryCode ? response.body.countryCode : "This IP does not lay in a contry!"}`);
        console.log(`The City of this IP is: ${response.body.city ? response.body.city : "The City could not be located!"}`);
        if(response.body.lat == "" && response.body.lon == "") {
            console.log("This IP can not be located / tracked!");
        } else console.log(`Coordinates:\nlat: ${response.body.lat}, lon: ${response.body.lon}`);
        console.log(`Organisation of the IP: ${response.body.org ? response.body.org : "The org. responsible of owning the IP is unknown!"}`);
        console.log(`Status of the Connection to the Client: ${response.body.status ? response.body.status : "Cannot connect to Ip!"}`);
        rl.close();
    })
    .catch((error) => {
        console.error('Backend did a littery fuckery. uwu');
        console.error(`Stackcase: ${error.stack}`)
        rl.close();
    })
})