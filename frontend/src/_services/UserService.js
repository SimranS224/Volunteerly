import S3 from 'aws-s3';
const config = {
    bucketName: 'volunteer-app-images',
    region: 'ca-central-1',
    accessKeyId: 'AKIA2ZJCVHTCYEEVWUKV',
    secretAccessKey: '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',
}
const S3Client = new S3(config);

// include all  user database calls and all functions here 

// generate random date for fake data
const randomDate = (start, end) => {
    let d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())),
        month = (d.getMonth() + 1).toString(),
        day = (d.getDate()).toString(),
        year = d.getFullYear();

    month = month.length < 2 ? '0' + month : month;
    day = day.length < 2 ? '0' + day : day;

	return [year, month, day].join('-');
}

const _types = ['cleanUp', 'communityBuilding', 'planting'];

//fake data
const data = [{user: 'admin', title: 'Beach Cleanup', desc: 'Clean the beach of ontario!',type:'cleanUp', date:randomDate(new Date(2020, 0, 1), new Date())}, 
{user: 'admin', title: 'Teach Art and Paint Murals', desc: 'Provide art classes to the youth and help with community painting projects', type:'communityBuilding', date:randomDate(new Date(2020, 0, 1), new Date())},
{user: 'admin', title: 'Teach English Classes', desc: 'Teach English to children and adults through short-term intensive classes', type:'communityBuilding', date:randomDate(new Date(2020, 0, 1), new Date())},
{user: 'admin', title: 'Provide Child-Care Support', desc: 'Work with young children and provide support to day-care staff',type:'communityBuilding', date:randomDate(new Date(2020, 0, 1), new Date())},
{user: 'admin', title: 'Support Manual Labor Projects', desc: 'Help paint homes and support basic manual labor tasks for local residents',type:'communityBuilding', date: randomDate(new Date(2020, 0, 1), new Date())},
{user: 'past', title: 'Clean the beaches', desc: 'Help clean the beach at Harbourfront', type:'cleanUp', date: randomDate(new Date(2020, 0, 1), new Date())},
{user: 'past', title: 'Clean the oceans', desc: 'Clean the Atlantic Ocean', type:'cleanUp', date: randomDate(new Date(2020, 0, 1), new Date())},
{user: 'past', title: 'Volunteer at SOS Autism', desc: 'Translate grant application documents', type:'communityBuilding', date: randomDate(new Date(2020, 0, 1), new Date())},
{user: 'future', title: 'Plant trees in HighGarden', desc: 'Bring a shovel!', type:'planting', date: randomDate(new Date(2020, 0, 1), new Date())}
]



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

const getEventTypes = (userId) => {
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

const addEvent = (event, user) => {
	data.push(event);
	for(let i = 0; i < event.pictures.length; i++){
		S3Client
	    .uploadFile(event.pictures[i], JSON.stringify(event.date) + "-" + event.user + "-" + event.title + "-" + i.toString(
	    	))
		.then(data => {console.log("data is: ", data); console.log("data location is: ", data.location)})
		.catch(err => console.log(err))
	}
	console.log("uploading files", event.pictures[0])
	

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
	console.log("user id: ", userId);
	return fetch(`http://localhost:3004/dev/api/enrollments/${userId}`)
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
	getEvents, addEvent, deleteEvent, getEnrolledEvents, enrollInEvent, updatePreferences, getPreferences, getEventTypes
}