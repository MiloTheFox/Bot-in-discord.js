module.exports = async (client) => {
    console.log(`${client.user.username} Login!`);

    await client.user.setActivity(client.config.playing);
};
