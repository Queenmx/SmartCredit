var React=require("react");
var ReactDOM=require("react-dom");
var MapHeader=React.createClass({
	backHandel:function(){
		if(this.props.type=="home"){
			var Home=require("./Home");
			var HomeHeader=require("./HomeHeader");
			ReactDOM.unmountComponentAtNode(document.getElementById("content"));
			ReactDOM.render(<Home />,document.getElementById("content"));
			ReactDOM.unmountComponentAtNode(document.getElementById("header"));
			ReactDOM.render(<HomeHeader />,document.getElementById("header"));
			$("#footer").show();
		}
	},
	render:function(){
		return(
			<div className="zhandianHeader">
				<div className="left_changeName" id="goBack" onClick={this.backHandel}>
					<img src="img/zhandian_select.png"/>
				</div>
				<div className="center_changeName"> 
					站点切换
				</div>
			</div>
		)
	},
	componentDidMount:function(){
	

	}
});
export default MapHeader;
