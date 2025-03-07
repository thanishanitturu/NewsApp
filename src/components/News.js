import React, { useState, useEffect } from 'react';
import NewsItem from "./NewsItem";
import Spinner from './spinner';
import PropTypes from 'prop-types';

const apiKey = process.env.REACT_APP_API_KEY;
console.log('API Key:', apiKey); // Log the API key

const News = ({ q, pageSize }) => {
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalResults, setTotalResults] = useState(0);

    const update = async (page) => {
        const proxyUrl = 'https://api.allorigins.win/raw?url='; // Use a different proxy
        const apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
        const url = proxyUrl + encodeURIComponent(apiUrl); // Combine proxy and API URL
        console.log('API URL:', url); // Log the URL
        setLoading(true);
        try {
            let data = await fetch(url);
            if (!data.ok) {
                throw new Error(`HTTP error! Status: ${data.status}`);
            }
            let parseData = await data.json();
            console.log('API Response:', parseData); // Log the response
            if (parseData.articles) {
                setArticles(parseData.articles);
                setTotalResults(parseData.totalResults);
            } else {
                console.error('No articles found in the response');
                setArticles([]); // Set articles to an empty array to avoid errors
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setArticles([]); // Set articles to an empty array to avoid errors
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        update(page);
    }, [q, page]);

    const handlePrevious = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNext = () => {
        if (page < Math.ceil(totalResults / pageSize)) {
            setPage(page + 1);
        }
    };

    return (
        <div>
            <div className="container my-3">
                <h2 className='text-center' style={{ margin: '35px 0px' }}>News-Top Headlines</h2>
                {loading && <Spinner />}
                <div className="row no-gutters">
                    {!loading && Array.isArray(articles) && articles.map((element) => {
                        return (
                            <div className="col-sm-12 col-md-6 col-lg-4" key={element.url}>
                                <NewsItem 
                                    title={element.title ? element.title.slice(0, 45) : ""}
                                    description={element.description ? element.description.slice(0, 88) : ""}
                                    ImageUrl={element.urlToImage} 
                                    newsUrl={element.url}
                                    title1={element.title ? element.title : ""}
                                    author={element.author} 
                                    date={element.publishedAt} 
                                    source={element.source.name} 
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className='container d-flex justify-content-between'>
                <button 
                    type="button" 
                    disabled={page <= 1} 
                    className='btn btn-dark' 
                    onClick={handlePrevious}
                >
                    &larr; Previous
                </button>
                <button 
                    type='button' 
                    disabled={page >= Math.ceil(totalResults / pageSize)} 
                    className='btn btn-dark' 
                    onClick={handleNext}
                >
                    Next &rarr;
                </button>
            </div>
        </div>
    );
};

News.propTypes = {
    q: PropTypes.string,
    pageSize: PropTypes.number,
};

News.defaultProps = {
    q: "climatic change",
    pageSize: 15,
};

export default News;