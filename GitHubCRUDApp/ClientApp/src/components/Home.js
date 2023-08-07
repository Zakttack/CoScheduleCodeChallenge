import React, {Component} from "react";
import './Home.css';

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            items: [],
            selectedIndex: -1,
            newValue: '',
            newRating: 0,
            newComment: '',
            updatedValue: '',
            updatedRating: 0,
            updatedComment: ''
        };
        this.readRecords();
    }

    createRecord() {
        fetch('/api/Record/${this.state.newValue}/${this.state.newRating}/${this.state.newComment}',
        {method: 'POST'}).then((response) => console.log(response))
    }

    deleteRecord() {
        fetch('/api/Record/${this.state.newValue}/${this.state.newRating}/${this.state.newComment}',
        {method: 'POST'}).then((response) => console.log(response))
    }

    readRecords() {
        fetch('/api/Record/')
        .then(response => response.json())
        .then(data => this.setState({items: data}))
    }

    searchContent() {
        fetch('/api/Record/${content}')
        .then(response => response.json())
        .then(data => this.setState({items: data}))
    }

    updateRecord() {
        fetch('/api/Record/${this.state.selectedIndex}/${this.state.updatedValue}/${this.state.updatedRating}/${this.state.updatedComment}',
        {method: 'POST'}).then((response) => console.log(response))
    }

    render() {
        return (
            <div>
                <p>Search For Value: <input type="text" value={this.state.content} onChange={(e) => {
                    this.setState({content: e.target.value});
                    this.searchContent();
                }}/></p>
                <table>
                    <thead>
                        <tr>
                            <th>Value</th>
                            <th>Rating</th>
                            <th>Comments</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.items.map((row, index) => (
                            <tr 
                                key={index} 
                                onClick={() => this.setState({selectedIndex: index})}
                            >
                                <td><input type="text" value={row.value} onChange={(a) =>
                                this.setState({updatedValue: a.target.value})}/></td>
                                <td><input type="text" value={row.rating} onChange={(b) =>
                                this.setState({updatedRating: b.target.valueAsNumber})}/></td>
                                <td><input type="text" value={row.comment} onChange={(c) =>
                                this.setState({updatedComment: c.target.value})}/></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="deleteAndUpdateButtons">
                    <button type="button" id="updateButton" onClick={() => this.updateRecord()}>Update Record</button>
                    <button type="button" id="deleteButton" onClick={() => this.deleteRecord()}>Delete Record</button>
                </div><br/>
                <div className="createControls">
                    <p>Value: <input type="text" value={this.state.newValue} onChange={(e) =>
                    this.setState({newValue: e.target.value})}/></p>
                    <p>Rating: <input type="text" value={this.state.newRating} onChange={(e) =>
                    this.setState({newRating: e.target.valueAsNumber})}/></p>
                    <p>Comment: <input type="text" value={this.state.newComment} onChange={(e) =>
                    this.setState({newComment: e.target.value})}/></p>
                    <button type="button" onClick={() => this.createRecord()}>Create Record</button>
                </div>
            </div>
        );
    }
}