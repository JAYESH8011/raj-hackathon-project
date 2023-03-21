const { google } = require("googleapis")
//TODO: DECIDE ON PERCENTAGE AT WHICH POST NEEDS TO BE DELETED
//PROFANITY VALUE: 0.5
//INSULT:0.4
exports.postCensor = async (post) => {
    API_KEY = process.env.P_APIKEY
    DISCOVERY_URL =
        "https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1"
    const analyzeRequest = {
        comment: {
            //TODO: Add our own queries to this
            text: post,
        },
        requestedAttributes: {
            // SEVERE_TOXICITY: {},
            // IDENTITY_ATTACK: {},
            INSULT: {},
            PROFANITY: {},
            // THREAT: {},
        },
    }
    const client = await google.discoverAPI(DISCOVERY_URL)
    const newPromise = () => {
        return new Promise((resolve, reject) => {
            client.comments.analyze(
                {
                    key: API_KEY,
                    resource: analyzeRequest,
                },
                (err, response) => {
                    if (err) {
                        reject(err)
                        return
                    }
                    let isOk
                    let data = JSON.stringify(response.data, null, 2)
                    data = JSON.parse(data)
                    const cleanedData = {
                        PROFANITY:
                            data.attributeScores.PROFANITY.summaryScore.value,
                        INSULT: data.attributeScores.INSULT.summaryScore.value,
                    }
                    console.log(cleanedData)
                    if (
                        cleanedData.PROFANITY >= 0.5 ||
                        cleanedData.INSULT >= 0.4
                    ) {
                        isOk = false
                    } else {
                        isOk = true
                    }
                    resolve(isOk)
                }
            )
        })
    }
    try {
        const isOk = await newPromise()
        return isOk
    } catch (error) {
        console.log(error.message)
    }
}
