


var connectInfo={
	baseURL:"http://demo.nuxeo.com/", username:"Administrator",password:"Administrator"

}	
var client = new nuxeo.Client({
  baseURL: 'http://demo.nuxeo.com',
  username: 'Administrator',
  password: 'Administrator'
})

var client = new nuxeo.Client(connectInfo);
client.schemas(["dublincore", "nuxeo_sales_info","nuxeo_customer_identification"]);
browseListOfCustomers();	