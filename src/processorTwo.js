module.exports.handler = async (event) => {
    try {
        for (const record of event.Records) {
            const item = JSON.parse(record.body);
            console.log('Processing item in Queue Two:', item);

            // Queue Two specific processing
            await processItemInQueueTwo(item);
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Successfully processed messages in Queue Two'
            })
        };
    } catch (error) {
        console.error('Error in Queue Two processor:', error);
        throw error;
    }
};

async function processItemInQueueTwo(item) {
    // Add your Queue Two specific processing logic
    console.log('Queue Two processing:', item);
    await new Promise(resolve => setTimeout(resolve, 1000));
}