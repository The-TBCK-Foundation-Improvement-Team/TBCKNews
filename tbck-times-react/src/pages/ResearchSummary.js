import { MuiNavBar } from '../components/MuiNavBar.js';
import { MuiFooter } from '../components/MuiFooter.js';
import { MuiCategoryBar } from '../components/MuiCategoryBar.js';
import { MuiSuggestedStories } from '../components/SuggestedStories.js';
import { ResearchSummaryTemplate } from '../components/ResearchSummaryTemplate.js';


function ResearchSummary() {
    return (
        <div className='ResearchSummary'>
            <MuiNavBar/>
            <MuiCategoryBar/>
            <div className="container">
                <div className="news-layout">
                    <ResearchSummaryTemplate  
                        title="The Future of Web Development: What's Next in 2025"
                        category="Web Development"
                        summary="The landscape of web development is rapidly evolving, bringing exciting new possibilities and challenges for developers worldwide. As we move further into 2025, we're witnessing unprecedented advancements in how we build and deploy web applications. Artificial Intelligence and Machine Learning are becoming integral parts of development workflows, with AI-powered code completion and bug detection becoming increasingly sophisticated. Progressive Web Apps (PWAs) continue to blur the line between web and native applications, offering offline capabilities and native-like experiences. WebAssembly is gaining momentum, enabling high-performance computing directly in the browser. Meanwhile, the rise of edge computing is transforming how we think about server architecture and content delivery. These innovations are not just changing the tools we use, but fundamentally reshaping the skills required to be a successful web developer in this dynamic landscape."
                        link="https://example.com/article"
                    />
                </div>
                <div className='sidebar-layout'>
                    <MuiSuggestedStories/>
                </div>
            </div>
            <MuiFooter/>
        </div>
    );
}

export default ResearchSummary;