import React from 'react';
import './Report.css'; 

function mapRatingToLabel(rating) {
    if (rating === 1) {
        return "Poor";
    } else if (rating === 2) {
        return "Good";
    } else if (rating === 3) {
        return "Better";
    } else if (rating === 4) {
        return "Best";
    } else if (rating === 5) {
        return "Excellent";
    } else {
        return "Unknown";
    }
}

function Report() {
 
    const companyName = "ABC Corporation";
    const role = "Software Engineer";
    const strengths = [
        { name: "Problem-solving", rating: 1 },
        { name: "Communication", rating: 2 },
        { name: "Teamwork", rating: 5 }
    ];
    const weaknesses = [
        { name: "Public speaking", rating: 3 },
        { name: "Time management", rating: 1 }
    ];
    const improvements = [
        { name: "Technical skills", rating: 2 },
        { name: "Leadership skills", rating: 3 }
    ];

    return (
        <div className="report-container">
            <h1>Interview Report</h1>
            <h2 className='h11'>Company Name: {companyName}</h2>
            <h3 className='h21'>Role Applied For: {role}</h3>

            <div className="section">
                <h2>Strengths</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Strength</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {strengths.map((strength, index) => (
                            <tr key={index}>
                                <td>{strength.name}</td>
                                <td>{mapRatingToLabel(strength.rating)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="section">
                <h2>Weaknesses</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Weakness</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {weaknesses.map((weakness, index) => (
                            <tr key={index}>
                                <td>{weakness.name}</td>
                                <td>{mapRatingToLabel(weakness.rating)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="section">
                <h2>Areas to Improve</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Area to Improve</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {improvements.map((improvement, index) => (
                            <tr key={index}>
                                <td>{improvement.name}</td>
                                <td>{mapRatingToLabel(improvement.rating)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Report;
