import {db} from './config.mjs';
import { Sequelize, DataTypes } from 'sequelize';

export async function loadSequelize() {

    try {
        const sequelize = new Sequelize
            (db.database,
                db.user,
                db.password,
                {
                    host: db.host,
                    dialect: db.dialect
                });

        sequelize.define("User",
            {

                username: DataTypes.STRING,
                allowNull: false,
                unique: true,

                email: {
                    type: DataTypes.STRING,
                    unique: true,
                    allowNull: false,
                    validate: {
                        isEmail: true,
                    }
                },

                password: {
                    type: DataTypes.STRING,
                    allowNull: false,
                }

            });



        sequelize.define("Post",
            {
                title: DataTypes.STRING,
                content: DataTypes.STRING,
            });

        sequelize.define("Comment",
            {
                content: DataTypes.STRING
            });


        const User = sequelize.models.User;
        const Post = sequelize.models.Post;
        const Comment = sequelize.models.Comment;

        User.hasMany(Post,
            {
                onDelete: 'cascade'
            }
        );
        Post.belongsTo(User);

        User.hasMany(Comment,
            {
                onDelete: 'cascade'
            }
        );
        Comment.belongsTo(User);

        Post.hasMany(Comment,
            {
                onDelete: 'cascade'
            }
        );
        Comment.belongsTo(Post);

        await User.create({
        username: "user1",
        email: "user@gmail.com",
        password: "foreveruser"});

        await Post.create({
            title: "Mon premier post",
            content: "Contenu de mon premier post",
            UserId: 1
        });

        await Comment.create({
            content: "Super post !",
            UserId: 1,
            PostId: 1
        });

        await User.create({
        username: "user2",
        email: "user2@gmail.com",
        password: "foreveruser"});

        await Post.create({
            title: "Mon premier post",
            content: "Contenu de mon premier post",
            UserId: 2
        });

        await Comment.create({
            content: "Super post !",
            UserId: 2,
            PostId: 2
        });

        await sequelize.sync({ force: false }); 

        return sequelize;

    } catch (error) {

        console.error(error);
        throw Error("Échec du chargement de Sequelize");
    }
}





