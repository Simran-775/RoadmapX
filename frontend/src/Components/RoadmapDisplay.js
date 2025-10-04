import React from 'react';
import './RoadmapDisplay.css'; // Import the CSS file

const RoadmapDisplay = ({ roadmap }) => {
    if (!roadmap) {
        return <div className="roadmap-container">No roadmap generated yet.</div>;
    }

    const renderRoadmapContent = (content) => {
        return content.split('\n').map((line, index) => {
            if (line.startsWith('### **')) {
                return <h3 key={index} dangerouslySetInnerHTML={{ __html: line.replace('### **', '').replace('**', '') }} />;
            }
            if (line.startsWith('#### **')) {
                return <h4 key={index} dangerouslySetInnerHTML={{ __html: line.replace('#### **', '').replace('**', '') }} />;
            }
            if (line.startsWith('*   **')) {
                // For bold list items like '* **Skill Goals:**'
                return <li key={index} className="roadmap-section-heading" dangerouslySetInnerHTML={{ __html: line.replace('*   **', '').replace('**', '') }} />;
            }
            if (line.startsWith('*    *   ')) {
                // For nested list items like '* * **Deepen Python & AI Engineering:**'
                return <ul key={index} className="nested-list"><li dangerouslySetInnerHTML={{ __html: line.replace('*    *   ', '') }} /></ul>;
            }
            if (line.startsWith('*   ')) {
                // For main list items like '* **Skill Goals:**' or '* **Project Ideas:**'
                return <li key={index} dangerouslySetInnerHTML={{ __html: line.replace('*   ', '') }} />;
            }
            if (line.trim() === '---') {
                return <hr key={index} className="roadmap-separator" />;
            }
            if (line.trim() === '') {
                return <br key={index} />; // Add a line break for empty lines
            }
            return <p key={index}>{line}</p>;
        });
    };

    return (
        <div className="roadmap-container">
            {renderRoadmapContent(roadmap)}
        </div>
    );
};

export default RoadmapDisplay;