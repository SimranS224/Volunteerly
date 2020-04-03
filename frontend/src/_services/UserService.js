import S3 from 'aws-s3';

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


const registerUser = async (first_name, last_name, email, password, pictures) => {

	// upload photo
	let profile_picture_url = ""
	if(pictures.length > 0){
		let data = await uploadPhoto(pictures, email)
		profile_picture_url = data.location
	}
	// regist user
	const endpoint = `${HOST}/dev/api/volunteers`;
	console.log({endpoint});
	const bodyToSend = JSON.stringify({first_name: first_name,
																			last_name: last_name,
																			email: email,
																			password: password,
																			profile_picture_url: profile_picture_url});
	console.log({bodyToSend});

	const options = {
										method: 'POST',
										headers: myHeaders,
										mode: 'cors',
										cache: 'default',
										body: JSON.stringify(bodyToSend),
									}

	const response = await fetch(endpoint, options);
	let data;
	try { 
		const body = await response.json()
		data = JSON.parse(body)
		console.log({data});
	} catch (err) {
		console.log(`${err}: register user, response: ${data}`);
		
	}
  return { body: data, photo_url: profile_picture_url };

}

const uploadPhoto = async (pictures, email) => {
	try{
		const data = await S3Client.uploadFile(pictures[0], email + "-profile")
		console.log(data)
		return data
	} catch(err){
		console.log(err)
	}

}





const getEvents = (user, preferences) => {
	console.log("getting events UserService");
	return fetch(`http://localhost:3004/dev/api/events`)
	.then(res => res.json())
	.then(res => {
		if(res.error) {
			throw(res.error)
		}
		console.log(JSON.parse(res.body))
		return JSON.parse(res.body)
	})
}


const updatePreferences = (user, preferences) => {
	console.log("updating preferences UserService")
	return fetch(`http://localhost:3004/dev/api/preferences/` + user,
	{
		headers: {
		  'Content-Type': 'application/json',
		},
		method: 'POST',
		body: JSON.stringify(preferences)
	})
	.then(res => res.json())
	.then(res => {
		if(res.error) {
			throw(res.error)
		}
		console.log(JSON.parse(res.body))
		return JSON.parse(res.body)
	})

}

const getPreferences = (userId) => {
	console.log("getting preferences UserService")
	return fetch(`http://localhost:3004/dev/api/preferences/` + userId)
	.then(res => res.json())
	.then(res => {
		if(res.error) {
			throw(res.error)
		}
		console.log("the body is: ", res.body)
		return (res.body)
	})
}

const getEventTypes = () => {
	console.log("get all event types")
	return fetch(`http://localhost:3004/dev/api/event_types`)
	.then(res => res.json())
	.then(res => {
		if(res.error) {
			throw(res.error)
		}
		console.log("the body is: ", res.body)
		return (res.body)
	})
}

const getUserStatistics = (userId) => {
	console.log("fetching user statistics")
	return fetch(`http://localhost:3004/dev/api/statistics/` + userId)
	.then(res => res.json())
	.then(res => {
		if(res.error) {
			throw(res.error)
		}
		console.log("the body is: ", res.body)
		return (res.body)
	})
}

const getUserAchievements = (userId) => {
	console.log("fetching user achievements")
	return fetch(`http://localhost:3004/dev/api/achievements/` + userId)
	.then(res => res.json())
	.then(res => {
		if(res.error) {
			throw(res.error)
		}
		console.log("the body is: ", res.body)
		return (res.body)
	})
}

/**
 * Returns the events that a user has enrolled in 
 * @param {integer} userId 
 */
const getEnrolledEvents = (userId) => {
	return fetch(`${HOST}/dev/api/enrollments/${userId}`)
		.then(res => res.json())
		.then(res => {
			if(res.statusCode !== 200) {
				throw(`Problem getting event for user: ${res.body}`)
			}
			return JSON.parse(res.body)
		})
		.catch(error => {
			console.error(error);
		})
}

const enrollInEvent = (userId, eventId) => {
	return fetch(`http://localhost:3004/dev/api/enrollments/add`, {
        method: 'post',
        body:    JSON.stringify({event_id: eventId, user_id: userId, attended: 0}),
        headers: { 'Content-Type': 'application/json' },
    })
	.then(res => res.json())
	.then(res => {
		if(res.error) {
			throw(res.error)
		}
		return res
	})
}



export const userService = {
	getEvents, getEnrolledEvents, enrollInEvent, getUserAchievements,
	updatePreferences, getPreferences, getEventTypes, getUserStatistics,
	registerUser
}