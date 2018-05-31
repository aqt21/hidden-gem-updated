// Page of List items to show
import React from 'react';
import $ from 'jquery';
import './css/List.css';
import ListItem from './ListItem';
import firebase from "firebase";
import FileUploader from 'react-firebase-file-uploader';
import Materialize from "materialize-css";
import './css/Submit.css';

// ModPage Component
class SubmitPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			listItems: [],
			fileName: "",
			isUploading: false,
			uploadPicUrl: "",
			currRefId: "",
			showInfo: false,
			currTab: "Locations"
		}
		this.saveChanges = this.saveChanges.bind(this);
		this.handleUploadStart = this.handleUploadStart.bind(this);
		this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
		this.handleUploadError = this.handleUploadError.bind(this);
	}

	// When component mounts, get the data and set the state of 'listItems'
	componentDidMount() {
		this.listRef = firebase.database().ref(this.state.currTab);
		this.listRef.on("value", (snapshot) => {
			if (snapshot.val()) {
				this.setState({ listItems: snapshot.val() });
			}
		});
		$('#mod').animate({ opacity: '1' });
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.currTab != this.state.currTab) {
			this.listRef = firebase.database().ref(this.state.currTab);
			this.listRef.on("value", (snapshot) => {
				if (snapshot.val()) {
					this.setState({ listItems: snapshot.val() });
				}
			});
			$('#mod').animate({ opacity: '1' });
		}
	}

	saveChanges(event) {
		event.preventDefault();
		console.log(this.listRef);
		this.listRef.push({
			title: event.target.elements["title"].value,
			imgurl: this.state.uploadPicUrl,
			description: event.target.elements["description"].value,
			address: event.target.elements["address"].value,
			latitude: event.target.elements["latitude"].value,
			longitude: event.target.elements["longitude"].value,
			tags: event.target.elements["tags"].value
		});

		this.setState({ uploadPicUrl: "", fileName: "" });

		event.target.reset();
	}

	handleUploadStart() {
		this.setState({ isUploading: true, fileName: $("#img-uploader").val().split('\\').pop() });
	}

	handleUploadError(error) {
		this.setState({ isUploading: false });
		console.error(error);
	}

	handleUploadSuccess(filename) {
		this.setState({ avatar: filename, isUploading: false });
		firebase.storage().ref('images').child(filename).getDownloadURL().then(url => this.setState({ uploadPicUrl: url }));

	}

	// Render a <ListItem> element for each element in the state
	render() {
		let currRef = this.state.currRefId;
		return (
			<div>
				<div id='submit'>
					<div className='container'>
						<div id='submit-form'>
						<h4 id='submit-title'>Submit New Location</h4>
						<form className="col s12" onSubmit={this.saveChanges}>

								<div className="input-field col s12">

								<FileUploader
									
									id='img-uploader'
									accept="image/*"
									randomizeFilename
									storageRef={firebase.storage().ref("images")}
									onUploadStart={this.handleUploadStart}
									onUploadError={this.handleUploadError}
									onUploadSuccess={this.handleUploadSuccess}
									onProgress={this.handleProgress}
								/>
								

								{(this.state.isUploading ?
									<div>
										<br />
										<i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
										<span className="sr-only">Loading...</span>
										<p className="center-align">Uploading image. Please Wait.</p>
									</div>
									: [(this.state.fileName ? <p key={this.state.fileName} className="center-align">Finished Uploading {this.state.fileName}</p> : false)]
								)}
							</div>

							<br />
							<div className="row">
								<div className="input-field col s12">
									<input id="title" type="text" />
									<label className="active" htmlFor="title">Title</label>

								</div>
							</div>

							<div className="row">
								<div className="input-field col s12" >
									<textarea className="materialize-textarea" id="description" type="text" />
									<label className="active" htmlFor="description">Description</label>
								</div>
							</div>

							<div className="row">
								<div className="input-field col s12">
									<input id="address" type="text" />
									<label className="active" htmlFor="address">Address</label>
								</div>
							</div>

							<div className="row">
								<div className="input-field col s6">
									<input id="latitude" type="text" />
									<label className="active" htmlFor="latitude">Latitude</label>
								</div>

								<div className="input-field col s6">
									<input id="longitude" type="text" />
									<label className="active" htmlFor="longitude">Longitude</label>
								</div>
							</div>

							<div className="row">
								<div className="input-field col s12">
									<input id="tags" type="text" />
									<label className="active" htmlFor="tags">Tags</label>
								</div>
							</div>

							<br />
							<button id="productsubmit" type="submit" disabled={this.state.isUploading} className="submit btn waves-effect waves-light" name="action">Save</button>

						</form>
					</div>
					</div>


				</div>
			</div>
		);
	}
}

export default SubmitPage;
