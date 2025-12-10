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

        

        await Post.create({
            title: "Mon premier post",
            content: "Contenu de mon premier post",
            UserId: 1
        });
        
        await Post.create({
            title: "Mon deuxième post",
            content: "Contenu de mon deuxième post",
            UserId: 2
        });

        await Post.create({
            title: "Mon troisième post",
            content: "Contenu du troisième post",
            UserId: 3
        });

        await Post.create({
            title: "Mon quatrième post",
            content: "Contenu du quatrième post",
            UserId: 4
        });

        await Post.create({
            title: "Mon cinquième post",
            content: "Contenu du cinquième post",
            UserId: 5
        });


        await Comment.create({
            content: "Super post !",
            UserId: 1,
            PostId: 1
        });

        await Comment.create({
            content: "Super post !",
            UserId: 2,
            PostId: 2
        });

        await Comment.create({
            content: "Nice post !",
            UserId: 3,
            PostId: 3
        });

        await Comment.create({
            content: "Sympa ce post !",
            UserId: 4,
            PostId: 4
        });

        await Comment.create({
            content: "J'adore ce post ! ",
            UserId: 5,
            PostId: 5
        });

        await sequelize.sync({ force: false }); 

        return sequelize;

    } catch (error) {

        console.error(error);
        throw Error("Échec du chargement de Sequelize");
    }
}





