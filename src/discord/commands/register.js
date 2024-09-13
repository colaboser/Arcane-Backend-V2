const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const User = require('../../Models/user.js');
const UserV2 = require('../../Models/userv2.js');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("register")
        .setDescription("Create An Account On ArcaneV2!")
        .addStringOption(option =>
            option.setName("username")
                .setDescription("What Do You Want Your Ingame Username To Be?")
                .setRequired(true))
        .addStringOption(option =>
            option.setName("email")
                .setDescription("Your Email Which Will Be Used To Login.")
                .setRequired(true))
        .addStringOption(option =>
            option.setName("password")
                .setDescription("Your Password Which Will Be Used To Login.")
                .setRequired(true)),

    async execute(interaction) {
        const username = interaction.options.getString('username');
        const email = interaction.options.getString('email');
        const password = interaction.options.getString('password');
        const userId = interaction.user.id;

        function generateAccountId() {
            const uuid = uuidv4();
            const accountId = uuid.replace(/-/g, '').substring(0, 32);
            return accountId.toUpperCase();
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const existingUser = await User.findOne({ discordId: userId });

            if (existingUser) {
                const embed = new EmbedBuilder()
                    .setColor("#ff0000")
                    .setTitle("Failed To Create An Account!")
                    .setDescription("Reason: You already created an account!");

                await interaction.reply({ embeds: [embed], ephemeral: true });
                return;
            }

            try {
<<<<<<< Updated upstream
                const newUser = new UserV2({
                    Create: new Date(),
                    Banned: false,
                    DiscordId: userId,
                    AccountId: generateAccountId(),
=======
                const newUserV2 = new UserV2({
                    Create: Date.now(),
                    Banned: false,
                    Discord: userId,
                    Account: generateAccountId(),
>>>>>>> Stashed changes
                    Username: username,
                    Username_lower: username.toLowerCase(),
                    Email: email,
                    Password: hashedPassword
<<<<<<< Updated upstream
                });
    
                await newUser.save();

                const embed = new EmbedBuilder()
                    .setColor("#a600ff")
                    .setTitle("Successfully Registered")
                    .setDescription("Registered With The Username: " + username);

                await interaction.reply({ embeds: [embed], ephemeral: true });
            } catch (error) {
                console.error('Error saving user:', error);
                await interaction.reply({ content: 'There was an error saving your account. Please try again later.', ephemeral: true });
=======
                });
    
                await newUserV2.save();
            }catch {
                const newUser = new User({
                    created: new Date(),
                    banned: false,
                    discordId: userId,
                    accountId: generateAccountId(),
                    username: username,
                    username_lower: username.toLowerCase(),
                    email: email,
                    password: hashedPassword
                });
    
                await newUser.save();
                console.log("Failed To Save UserV2 Model!");
>>>>>>> Stashed changes
            }
        } catch (error) {
            console.error('Error checking existing user:', error);
            await interaction.reply({ content: 'There was an error registering your account. Please try again later.', ephemeral: true });
        }
    }
};
