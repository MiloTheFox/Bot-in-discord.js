module.exports = {
    name: "say",
    aliases: ["botsay", "s"],
    description: "(Dev only) Returns a Message",
    run: async (client, message, args) => {
        try {
            if (message.author.id !== "705557092802625576") return message.channel.send("This command is only available for the developer!");
            let sayMessage = args.join(" ");
            message.delete();
            await message.channel.sendTyping();
            await message.channel.send(sayMessage);
        } catch (error) {
            console.log(error);
        }
    }
};
