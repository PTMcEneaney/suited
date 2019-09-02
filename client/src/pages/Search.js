import React, { Component } from "react";
// import { Link } from "react-router-dom";
import Form from "../components/Form";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";

import Card from "../components/Card";
import Job from "../components/Job";
import { List } from "../components/List";
import API from "../utils/API";

// import Moment from 'react-moment';

//for logged in purposes
import sessions from "../utils/sessions"

let loggedIn;
let sessionKey;

function favoriteJob(job) {
  let userJob = {
    url: job.job.url,
    title: job.job.title,
    company: job.job.company,
    location: job.job.location,
    summary: job.job.summary,
    // date: job.job.date,
    // ratings: job.job.ratings,
    // salary: job.job.salary,
    /////////////new user specific things//////////////////
    userID: sessionKey,
    jobID: job.job._id,
    interest: null,
    status: null
  }

//   console.log(dummyJob);
  API.postUserJob(userJob)
        .then( response => {
            console.log('favorite Job response: ', response)
            if (response.status === 200) {
              alert("job added to favorites!")
            } 
        }).catch(error => {
            alert('create favorite error: ', error)
        });
}

class Search extends Component {

     state = {
        jobs: [],
        q: "",
        l: "",
        s: ["html", "css", "crazy", "java "],
        message: "Enter in your desired Job to begin!"
    };

    getJobs = () => {
        API.getJobs(this.state.q, this.state.l, this.state.s)
            .then(res => {
                const myList = this.state.s;
                const sorted = res.data.map(job => {
                    const subj = job.subject.filter(j => myList.includes(j));
                    job.subject = subj;
                    return job;
                }).sort((x, y) => y.subject.length - x.subject.length)
                this.setState({
                    jobs: sorted
                })
            }
            )
            .catch((err) => {
                console.log(err);
                this.setState({
                    jobs: [],
                    message: "No New Jobs Found, Try a Different Query"
                })
            });
    };


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  handleFormSubmit = event => {
    event.preventDefault();
    this.getJobs();
  };
  
  
  render() {
    sessionKey = sessions.getSession();
    if (sessionKey) {
      loggedIn = true;
      // console.log("logged in: ", sessionKey)
    } else {
      loggedIn = false;
      // console.log("no user logged in")
    }
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                Hello World: Search Bar Here
              </h1>
              {/* <button onClick={() => favoriteJob("test")} className="btn btn-light" rel="noopener noreferrer">Test</button> */}

              {/* <input className="form-control" type="text" placeholder="Default input"></input> */}
              <Form
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
                q={this.state.q}
                l={this.state.l}
              />
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <h2 className="text-center">{this.state.message}</h2>
          <Col size="md-10 md-offset-1">
            {/* insert search filter component */}
            <h2>Search Filter goes here</h2>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            {/* insert job container and job card components */}
            <h2>Job Cards live here - from Job DB Collection</h2>

            <Card title="Results">
              {this.state.jobs.length ? (
                <List>
                  {this.state.jobs.map(job => (
                    <Job
                      key={job.id}
                      title={job.title}
                      company={job.company}
                      location={job.location}
                      date={job.date}
      //   <Moment date={job.date} />
                      summary={job.summary}
                      url={job.url}
                      onClick={() => favoriteJob({job})}
                    />
                  ))}
                </List>
              ) : (
                  <h2 className="text-center">{this.state.message}</h2>
                )}
            </Card>


          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            {/* insert footer component */}
            <h2>Footer Down at the bottom</h2>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Search;