import S3 from 'aws-s3';
import dotenv from "dotenv";
dotenv.config();


const config = {
    bucketName: 'volunteer-app-images',
    region: process.env.REGION,
    accessKeyId: process.env.Access_key_ID,
    secretAccessKey: process.env.Secret_access_key,
}
const S3Client = new S3(config);
const HOST = process.env.HOST

const getEvents = (user, preferences) => {
	console.log("getting events");
	return fetch(`${HOST}/dev/api/events`)
	.then(res => res.json())
	.then(res => {
		if(res.error) {
			throw(res.error)
		}
		console.log(JSON.parse(res.body))
		return JSON.parse(res.body)
	})
}

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

const addEvent = async (currEvent) => {
	const event = currEvent.event
	data.push(event);
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
	let stringofPictures = ''

	for (let i =0; i < images.length;i++){
		stringofPictures += images[i] 
		stringofPictures +=  " "
	}
	console.log({stringofPictures});
	
	stringofPictures = stringofPictures.slice(0,-1)
	console.log({images});
	console.log({stringofPictures});
	
	
	let preparedEvent = {...event}
	preparedEvent.photo_url = stringofPictures
	const body = JSON.stringify(preparedEvent);
	console.log({body});
	
	return getEvents(null)
}

const deleteEvent = (event, user) => {
	const index = data.indexOf(event);
	if (index > -1) {
		data.splice(index, 1);
	}
	return getEvents(user)
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