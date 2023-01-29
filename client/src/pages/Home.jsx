import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Card, FormField, Loader } from "../components";

const RenderCards = ({ data, title }) => {
    if (data?.length > 0) {
        return data.map((post) => <Card key={post._id} {...post} />);
    }
    return (
        <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">
            {title}
        </h2>
    );
};

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [allPosts, setAllPosts] = useState(null);

    const [searchText, setSearchText] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const res = await axios.get(
                    "http://localhost:5000/api/v1/post"
                );
                setAllPosts(res.data.data.reverse());
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);

        setSearchTimeout(
            setTimeout(() => {
                const searchResult = allPosts.filter(
                    (item) =>
                        item.name
                            ?.toLowerCase()
                            .includes(searchText.toLowerCase()) ||
                        item.prompt
                            ?.toLowerCase()
                            .includes(searchText.toLowerCase())
                );
                setSearchedResults(searchResult);
            }, 500)
        );
    };

    return (
        <section className="max-w-7xl mx-auto">
            <div>
                <h1 className="font-extrabold text-[#222328] text-[32px]">
                    The Community Showcase
                </h1>
                <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
                    Browse throgh a collection of imaginative and visually
                    stunning images generated by DALL-E AI
                </p>
                <div className="mt-16">
                    <FormField
                        labelName="Search Posts"
                        type="text"
                        name="text"
                        placeholder="Search posts"
                        value={searchText}
                        handleChange={handleSearchChange}
                    />
                </div>
                <div className="mt-10">
                    {loading ? (
                        <div className="flex  justify-center items-center">
                            <Loader />
                        </div>
                    ) : (
                        <>
                            {searchText && (
                                <h2 className="font-medium text-[#666e75] text-xl mb-3">
                                    Showing results for{" "}
                                    <span className="text-[#222328]">
                                        {searchText}
                                    </span>
                                </h2>
                            )}
                            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                                {searchText ? (
                                    <RenderCards
                                        data={searchedResults}
                                        title="No Search Results Found"
                                    />
                                ) : (
                                    <RenderCards
                                        data={allPosts}
                                        title="No Posts Found"
                                    />
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Home;