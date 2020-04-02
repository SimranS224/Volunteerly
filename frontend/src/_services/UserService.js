const HOST = process.env.REACT_APP_BACKEND_PORT;
const myHeaders = new Headers({
  'Content-Type': 'application/json',
});

const updatePreferences = (user, preferences) => {
	console.log("update events")
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

const getPreferences = (user) => {
	console.log("update events")
	return fetch(`http://localhost:3004/dev/api/preferences/` + user)
	.then(res => res.json())
	.then(res => {
		if(res.error) {
			throw(res.error)
		}
		console.log(JSON.parse(res.body))
		return JSON.parse(res.body)
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
	getEnrolledEvents, enrollInEvent, updatePreferences, getPreferences
}