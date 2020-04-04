import S3 from 'aws-s3';
import Cookie from "js-cookie"

const config = {
    bucketName: process.env.REACT_APP_buckt_name,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_Access_key_ID,
    secretAccessKey: process.env.REACT_APP_Secret_access_key,
}
const S3Client = new S3(config);
const HOST = process.env.REACT_APP_BACKEND_PORT;
const myHeaders = new Headers({
  'Content-Type': 'application/json',
});

const addEvent = async (currEvent) => {
	console.log({config});
	
	const event = currEvent.event
	let images = []
	for(let i = 0; i < event.photo_url.length; i++){
		try {
			const data = await S3Client.uploadFile(event.photo_url[i], JSON.stringify(event.date) + "-" + event.user + "-" + event.title + "-" + i.toString())
			images.push(data.location)
			console.log(typeof(data.location))
			console.log(data.location)
		} catch(err){
			console.log(err)
		}
	}
	const resolvedImages = await Promise.all(images);
	let stringofPictures = ''

	for (let i =0; i < images.length;i++){
		stringofPictures += images[i] 
		stringofPictures +=  " "
	}
	console.log({stringofPictures});
	
	stringofPictures = stringofPictures.slice(0,-1)
	console.log({resolvedImages});
	console.log({stringofPictures});
	
	
	let preparedEvent = {...event}
	preparedEvent.photo_url = stringofPictures
	const bodyToSend = JSON.stringify(preparedEvent);
	console.log({bodyToSend});
	const token =  Cookie.get("token") ? Cookie.get("token") : null
	const endpoint = `${HOST}/dev/api/events`;
	console.log({endpoint});
	const options = {
										method: 'POST',
										headers: {'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'},
										mode: 'cors',
										cache: 'default',
										body: bodyToSend,

									}
	const response = await fetch(endpoint, options);
	let data;
	try { 
		const{ body } = await response.json()
		data = JSON.parse(body)
		console.log({data});
	} catch (err) {
		console.log(`${err}: add Event, response: ${data}`);
		
	}
  return data;
	

}

const deleteEvent = async (currEvent) => {
	const event = currEvent.event
	const token =  Cookie.get("token") ? Cookie.get("token") : null
	const endpoint = `${HOST}/dev/api/events/${event.id}`;
	console.log({endpoint});
	const options = {
										method: 'DELETE',
										headers: {'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'},
										mode: 'cors',
										cache: 'default',
										
									}
	const response = await fetch(endpoint, options);
	let data;
	try { 
		const{ body } = await response.json()
		data = JSON.parse(body)
		console.log({data});
	} catch (err) {
		console.log(`${err}: delete Event, response: ${data}`);
		
	}
  return data;
}


const getEvents = async (user, preferences) => {
  let endpoint;
  if (user){
    endpoint = `${HOST}/dev/api/events/${user.id}`;
  } else {
    endpoint = `${HOST}/dev/api/events/`;
  }
	console.log({endpoint});
	const options = {
										method: 'GET',
										headers: myHeaders,
										mode: 'cors',
										cache: 'default',
									}
	const response = await fetch(endpoint, options);
	let data;
	try { 
		const{ body } = await response.json()
		data = JSON.parse(body)
		console.log({data});
	} catch (err) {
		console.log(`${err}: getEvents, response: ${data}`);
		
	}
  return data;
}

const getOrganizations = async () => {
  const endpoint = `${HOST}/dev/api/organizations`;
	console.log({endpoint});
	const token =  Cookie.get("token") ? Cookie.get("token") : null
	const options = {
										method: 'GET',
										headers: {'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'},
										mode: 'cors',
										cache: 'default',
										
									}
	const response = await fetch(endpoint, options);
  let data;
  let organizations;
  try { 
		const{ body } = await response.json()
		data = JSON.parse(body)
    console.log({data});
    organizations = data.map((d) => {
      console.log({d});
      
      return {
                organization_id: d.id,
                name: d.organization_name,
                check: false
              }
    });
    console.log({organizations});
    
	} catch (err) {
		console.log(`${err}: getOrganizations, response: ${data}`);
		
  }
 
  
  return organizations;
}


export const eventService = {
	getEvents, addEvent, deleteEvent, getOrganizations
}