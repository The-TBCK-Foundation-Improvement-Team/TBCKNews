import { useParams, Link } from "react-router-dom";
import { MuiNavBar } from '../components/MuiNavBar.js';
import { MuiFooter } from '../components/MuiFooter.js';
import { MuiCategoryBar } from '../components/MuiCategoryBar.js';

// Example JSON list for testing purposes
const exampleResults = [
  {
    id: 10,
    title: "Apple",
    description: "A sweet, crisp fruit.",
    date: "2025-02-01",
    author: "John Doe",
    imageUrl: "https://via.placeholder.com/150", // Example image URL
  },
  {
    id: 7,
    title: "Apple",
    description: "A sweet, crisp fruit.",
    date: "2025-02-01",
    author: "John Doe",
    imageUrl: "https://via.placeholder.com/150", // Example image URL
  },
  {
    id: 8,
    title: "Apple",
    description: "A sweet, crisp fruit.",
    date: "2025-02-01",
    author: "John Doe",
    imageUrl: "https://via.placeholder.com/150", // Example image URL
  },
  {
    id: 1,
    title: "Apple",
    description: "A sweet, crisp fruit.",
    date: "2025-02-01",
    author: "John Doe",
    imageUrl: "https://via.placeholder.com/150", // Example image URL
  },
  {
    id: 2,
    title: "Banana",
    description: "A soft, yellow fruit.",
    date: "2025-02-02",
    author: "Jane Smith",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "Carrot",
    description: "A crunchy orange vegetable.",
    date: "2025-02-03",
    author: "Samuel Lee",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    title: "Dragonfruit",
    description: "A vibrant pink fruit with white flesh.",
    date: "2025-02-04",
    author: "Emily White",
    imageUrl: "https://via.placeholder.com/150",
  },
];

const SearchPage = () => {
  const { searchQuery } = useParams(); // Get the searchQuery from the URL parameter

  // Filter results based on the searchQuery
  const filteredResults = exampleResults.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: "#f4f4f4", minHeight: "100vh" }}>
        <MuiNavBar/>
        <MuiCategoryBar/>
        <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
            <header style={{ marginBottom: "30px", textAlign: "left" }}>
                <h1 style={{ fontSize: "36px", fontWeight: "bold", color: "#222" }}>
                  {searchQuery}
                </h1>
                <p style={{ fontSize: "18px", color: "#555" }}>
                  {filteredResults.length} results found.
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
                {filteredResults.length > 0 ? (
                    filteredResults.map((result) => (
                        <Link
                            key={result.id}
                            to={`/detail/${result.id}`} // Navigates to a detail page for the result
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
                            <img
                                src={result.imageUrl}
                                alt={result.title}
                                style={{
                                    width: "150px", // Adjust image size
                                    height: "150px",
                                    objectFit: "cover", // Ensures the image covers the space without distorting
                                    borderRadius: "8px",
                                }}
                            />
                            <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                                <h2 style={{ fontSize: "24px", fontWeight: "600", color: "#333" }}>
                                    {result.title}
                                </h2>
                                <p style={{ fontSize: "16px", color: "#777", marginBottom: "10px" }}>
                                    {result.description}
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
