import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

// ... other imports
function AccordionComponent() {
  const [activeKey, setActiveKey] = useState(null);

  const handleAccordionClick = (event, key) => {
    setActiveKey(key === activeKey ? null : key);
  };
  const courseData = [
    {
      title: "Course 1",
      subheadings: [
        { id: 1, title: "Subheading 1" },
        { id: 2, title: "Subheading 2" },
      ],
    },
    // ... other courses
  ];
  return (
    <Accordion activeKey={activeKey} onSelect={handleAccordionClick}>
      {courseData.map((course, index) => (
        <Card key={index}>
          <Accordion.Toggle as={Card.Header} eventKey={index}>
            {course.title}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={index}>
            <Card.Body>
              {course.subheadings.map((subheading, subIndex) => (
                <li key={subIndex}>
                  <a
                    href={`/courses/${course.id}/subheadings/${subheading.id}`}
                  >
                    {subheading.title}
                  </a>
                </li>
              ))}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      ))}
    </Accordion>
  );
}

export default AccordionComponent;
