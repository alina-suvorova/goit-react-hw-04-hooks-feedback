import React, { Component } from 'react'
import FeedbackOptions from './FeedbackOptions/FeedbackOptions'
import Section from './Section/Section';
import Notification from './Statistics/Notification';
import Statistics from './Statistics/Statistics'



class Feedback extends Component {

    state = {
        good: 0,
        neutral: 0,
        bad: 0
      }
      constructor() {
        super();
    
        this.onLeaveFeedback = this.onLeaveFeedback.bind(this);
      }

    onLeaveFeedback = (e) => {
        const {name} = e.target
        this.setState((prev) => ({[name]: prev[name] + 1}))
        this.countTotalFeedback()
    } 
    countTotalFeedback(good, neutral, bad) {
        return good + neutral + bad;        
    }
    countPositiveFeedbackPercentage(good, total) {
       return good / total * 100
    }
    render() {
        const {good, neutral, bad} = this.state
        const total = this.countTotalFeedback(good, neutral, bad)
        const positivePercentage = this.countPositiveFeedbackPercentage(good, total)
        return (
            <>
                <Section title="Please leave feedback">
                    <FeedbackOptions options={this.state} onLeaveFeedback={this.onLeaveFeedback} />
                </Section>
                <Section title="Statistics">
                    {total ? 
                    <Statistics 
                        good={good} 
                        neutral={neutral} 
                        bad={bad} 
                        total={total} 
                        positivePercentage={positivePercentage} /> :
                    <Notification message="No feedback given"/> }
                </Section>
            </>
        )
    }
}

export default Feedback;
