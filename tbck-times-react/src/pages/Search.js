
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MuiNavBar } from '../components/MuiNavBar.js';
import { MuiFooter } from '../components/MuiFooter.js';
import { MuiCategoryBar } from '../components/MuiCategoryBar.js';
import "../css/App.css";

const categories = ['News', 'Advocacy', 'Events', 'WarriorOfTheMonth', "Sports", "Research"]; // List of categories
//method to get the news by the newest-latest date from the API
const fetchNews = async (search) => {

  let url = 'http://localhost:8081/news/newest';

  console.log("Search: " + search);

  try{

    if (typeof search === 'string' && search.trim() !== '') {
      // Ensure category is a valid string before calling .toLowerCase()
      const matchingCategory = categories.find(category => 
        typeof category === 'string' && category.toLowerCase() === search.toLowerCase() // Exact match check
      );

      if (matchingCategory) {
        console.log("Found matching category:", matchingCategory); // Debugging the category match
        url = `http://localhost:8081/news/category/${matchingCategory}`;
      } else {
        console.log("No matching category found.");
      }
    }

    const response = await fetch(url);
    console.log("used url: " + url);
    if(!response.ok){
      throw new Error('Network response was not ok');
    }else{
      return await response.json();
    }
  }catch(error){
    console.log(error);
    return [];
  }
  
}

const SearchPage = () => {
  const { searchQuery } = useParams(); // Get the searchQuery from the URL parameter
  const [news, setNews] = useState([]);

  // Fetch news data from the API
  useEffect(() => {
    console.log("Current searchQuery:", searchQuery); // Debugging
    const fetchAndSetNews = async () => {
      let news = await fetchNews(searchQuery);

      if (searchQuery && !categories.includes(searchQuery)) { 
        // If the search query is not a category, filter the news by title
        const lowerCaseSearch = searchQuery.toLowerCase();
        news = news.filter((item) => item.title.toLowerCase().includes(lowerCaseSearch));
      }
      console.log("Fetched news:", news); // Debugging API response
      setNews(news);
    };

    if (searchQuery !== undefined) { 
        fetchAndSetNews();
      }
    
  }, [searchQuery]);

  return (
    <div style={{ backgroundColor: "#f4f4f4", minHeight: "100vh" }}>
        <MuiNavBar/>
        <MuiCategoryBar/>
        <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto", minHeight: "100vh" }}>
            <header style={{ marginBottom: "30px", textAlign: "left" }}>
                <h1 style={{ fontSize: "36px", fontWeight: "bold", color: "#222", color: "#00595a" }}>
                  {searchQuery}
                </h1>
                <p style={{ fontSize: "18px", color: "#555" }}>
                  {news.length} results found.
                </p>
            </header>

            <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
            >
                {news.length > 0 ? (
                    news.map((result) => (
                        <Link
                            key={result.newsId}
                            to={`/details/${result.title.replace(/\s+/g, "-")}/${result.date.replace(/\s+/g, "-")}`} // Navigates to a detail page for the result
                            state={{ newsId: result.newsId }} // Passes the newsId to the detail page
                            style={{
                                textDecoration: "none", // Remove underline from the link
                                width: "100%", // Full width with some margin on small screens
                                maxWidth: "1200px", // Ensure cards don't stretch too wide
                                backgroundColor: "#fff",
                                borderRadius: "8px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                padding: "20px",
                                display: "flex",
                                gap: "20px", // Space between the image and text content
                                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                marginBottom: "20px", // Add space between each card
                            }}
                        >
                          {result.images?.length > 0 && (
                            <img
                                src={result.images[0].url} // Use the first image in the array
                                alt={result.title}
                                style={{
                                    width: "150px", // Adjust image size
                                    height: "150px",
                                    objectFit: "cover", // Ensures the image covers the space without distorting
                                    borderRadius: "8px",
                                }}
                            />
                              )}
                            <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                                <h2 className="adminh2" style={{ fontSize: "24px", fontWeight: "600", color: "#00595a" }}>
                                    {result.title}
                                </h2>
                                <p style={{ fontSize: "16px", color: "#777", marginBottom: "5px" }}>
                                    {result.contentOne.split('.')[0] + "."} {/* Display the first sentence */}
                                </p>
                                <p
                                    style={{
                                        fontSize: "14px",
                                        color: "#aaa",
                                        marginBottom: "15px",
                                    }}
                                >
                                    {result.author} | {result.date}
                                </p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p style={{ fontSize: "18px", textAlign: "center", color: "#888" }}>
                        No results found for "{searchQuery}"
                    </p>
                )}
            </div>
        </div>
        <MuiFooter/>
    </div>
  );
};

export default SearchPage;
