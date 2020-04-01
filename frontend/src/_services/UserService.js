import S3 from 'aws-s3';

const config = {
    bucketName: 'volunteer-app-images',
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_Access_key_ID,
    secretAccessKey: process.env.REACT_APP_Secret_access_key,
}
const S3Client = new S3(config);
const HOST = process.env.REACT_APP_BACKEND_PORT;
const myHeaders = new Headers({
  'Content-Type': 'application/json',
});

const getEvents_fake = (user, preferences) => {
	// When integrating with backend "user" and "preferences" should be 
	// sent as parameters to the backend, and the backend will retrieve the
	// correct filtered events for the user. 

	for(let i = 0; i < data.length; i++){
		data[i].date = randomDate(new Date(2020, 0, 1), new Date())
	}
	console.log("preferences", preferences);

	let new_data = data;

	if (user !== undefined && user !== null) {
		new_data = new_data.filter(event => {
			return event.user === user
		})
	}

	if (preferences !== undefined && preferences !== null) {
		console.log("here", preferences)
		const types = Object.keys(preferences).filter(key => preferences[key])
		new_data = new_data.filter(event => {
			console.log(types.includes(event.type), event.type, types)
			return types.includes(event.type)	
		});
	}
	console.log(new_data)
	return new_data
	
}
// fix bug when adding 
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

	const endpoint = `${HOST}/dev/api/events`;
	console.log({endpoint});
	const options = {
										method: 'POST',
										headers: myHeaders,
										mode: 'cors',
										cache: 'default',
										body: bodyToSend
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

	const endpoint = `${HOST}/dev/api/events/${event.id}/${event.organization_id}`;
	console.log({endpoint});
	const options = {
										method: 'DELETE',
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
		console.log(`${err}: delete Event, response: ${data}`);
		
	}
  return data;
}


const getEvents = async (user, preferences) => {
	const endpoint = `${HOST}/dev/api/events/${user.id}`;
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


/**
 * Returns the events that a user has enrolled in 
 * @param {integer} userId 
 */
const getEnrolledEvents = (userId) => {
	return fetch(`${HOST}/dev/api/enrollments/${userId}`)
		.then(res => res.json())
		.then(res => {
			if(res.error) {
				throw(res.error)
			}
			return JSON.parse(res.body)
		})
}



export const userService = {
	 getEvents, addEvent, deleteEvent, getEnrolledEvents
}