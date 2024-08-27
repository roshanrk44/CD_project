import React, { useState, useEffect } from "react";
import collegesData from "../data/colleges.json";
import './CollegeTable.css'

const CollegeTable = () => {
  const [colleges, setColleges] = useState([]);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [visibleColleges, setVisibleColleges] = useState(10);

  useEffect(() => {
    setColleges(collegesData);
  }, []);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const handleSort = (key) => {
    const order = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(order);
    setSortKey(key);
    const sortedColleges = [...colleges].sort((a, b) => {
      if (order === "asc") {
        return a[key] > b[key] ? 1 : -1;
      } else {
        return a[key] < b[key] ? 1 : -1;
      }
    });
    setColleges(sortedColleges);
  };
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + document.documentElement.scrollTop;
      const threshold = document.documentElement.offsetHeight ;

      if (scrollPosition >= threshold) {
        loadMoreColleges();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleColleges]);
  const loadMoreColleges = () => {
    setVisibleColleges((prev) => prev + 10);
  };

  const filteredColleges = colleges
    .filter((college) =>
      college.name.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, visibleColleges);

  return (
    <div>
      <input
        type="text"
        placeholder="Search by college name"
        value={query}
        onChange={handleSearch}
      />
      <div>
        <span>Total Colleges Found: {colleges.length}</span>

      </div>
      <table>
        <thead>
          <tr>
            <th>CD Rank</th>
            <th onClick={() => handleSort("name")}><div>Colleges <img src="https://cdn-icons-png.flaticon.com/128/25/25756.png" /></div></th>
            <th onClick={() => handleSort("fees")}><div>Course Fees <img src="https://cdn-icons-png.flaticon.com/128/25/25756.png" /></div></th>
            <th onClick={() => handleSort("Highest-Package")}><div>Placement <img src="https://cdn-icons-png.flaticon.com/128/25/25756.png" /></div></th>
            <th onClick={() => handleSort("userReviewRating")}><div>User Review <img src="https://cdn-icons-png.flaticon.com/128/25/25756.png"/></div></th>
            <th>Ranking</th>
          </tr>
        </thead>
        <tbody>
          {filteredColleges.map((college,index) => (
          
            <tr className={college.featured==1 ? "tr-bg":""} key={college.id}>
                <td>#{++index}</td>
              <td><div className={college.featured==1 ? "feature":"display"}><img src="https://images.collegedunia.com/public/asset/img/featured-flag.svg"/><div className="img-txt">Featured</div></div><div className="logo"><img src={college.logo} width="43px" height="43px"/></div><div className="college">{college.name}<p>{college.address}&nbsp; | {college.approved}</p></div></td>
              <td className="package-fees">₹ {college.fees} <p>B.E/B.Tech<br/>- 1st Year Fees</p></td>
              <td className="package-fees">₹ {college["Average-Package"]}<p>Average Package</p>₹ {college["Highest-Package"]}<p>Highest Package</p></td>
              <td>{college.userReviewRating}/10</td>
              <td>{college.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CollegeTable;
