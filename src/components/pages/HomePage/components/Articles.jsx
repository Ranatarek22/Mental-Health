import React from "react";
import { useState, useEffect } from "react";
import { apiInstance } from "../../../../axios";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";

export function Articles() {
    const [posts, setPosts] = useState([]);
    const pageSize = 6;
    const navigate = useNavigate();
    // const commentsCount = usePostStore((state) => state.totalComments);

    const fetchPosts = async () => {
        try {
            debugger;
            const response = await apiInstance.get(
                `/posts?PageNumber=5&PageSize=${pageSize}`
            );
            const newPosts = response.data;
            //comment this sensitive data it show user id
            // console.log(newPosts);

            setPosts(newPosts);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div
            className="container-fluid"
            style={{
                // marginLeft: "calc((100% - 100vw) / 2)",
                width: "100vw",
                backgroundColor: "#fbfbfb",
                padding: "100px",
                marginLeft: "calc((100% - 100vw) / 2)",
                paddingTop: 0,
            }}
        >
            <section id="articles" className="articles">
                <h3
                    className="mb-5"
                    style={{
                        fontSize: "4rem",
                        fontWeight: 300,
                    }}
                >
                    Recent Articles
                </h3>
                <div
                    className="post-cards"
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        flexWrap: "wrap",
                    }}
                >
                    {posts.map((post) => {
                        return (
                            <>
                                <div
                                    key={post.id}
                                    className="post-card flex-column justify-content-center"
                                    style={{
                                        backgroundColor: "#fff",
                                        width: "30%",
                                        margin: "20px",
                                        padding: "40px",
                                        borderRadius: "10px",
                                        transition: "all 0.3s ease",
                                    }}
                                >
                                    <div
                                        className="post-author-info"
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "10px",
                                            alignItems: "center",
                                        }}
                                    >
                                        <div className="image">
                                            <img
                                                src={"/landingImages/logo.png"}
                                                alt="post"
                                                style={{
                                                    width: "100%",
                                                    borderRadius: "50%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        </div>
                                        <div
                                            className="name"
                                            style={{
                                                fontSize: "1.2rem",
                                                fontWeight: 600,
                                            }}
                                        >
                                            David Ortiz
                                            {/* {post.username ?? "Anonymous"} */}
                                        </div>
                                    </div>
                                    <div className="content mt-3">
                                        <h3
                                            style={{
                                                fontSize: "1.1rem",
                                                fontWeight: 600,
                                                color: "rgb(104 110 116)",
                                            }}
                                        >
                                            Lorem ipsum, dolor sit amet
                                            consectetur adipisicing elit.
                                            Tenetur animi alias repudiandae
                                            quasi maxime odio.
                                        </h3>
                                    </div>
                                    <div
                                        className="date"
                                        style={{
                                            fontSize: "0.8rem",
                                            fontWeight: 500,
                                            color: "rgb(104 110 116)",
                                        }}
                                    >
                                        {post.postedOn.slice(0, 10)}
                                    </div>
                                    {/* <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <button
                                            type="button"
                                            style={{
                                                backgroundColor: "transparent",
                                                border: "2px solid black",
                                                padding: "10px",
                                                color: "black",
                                                borderRadius: "10px",
                                                fontSize: "1rem",
                                                fontWeight: 700,
                                                cursor: "pointer",
                                            }}
                                        >
                                            Comment Now
                                        </button>
                                    </div> */}
                                </div>
                            </>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
