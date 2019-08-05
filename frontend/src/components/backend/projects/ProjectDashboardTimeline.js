import React from 'react';
import {connect} from "react-redux";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {Button, Checkbox, Drawer, Dropdown, Form, Icon, List, Menu, Row, Select, Skeleton, Table} from "antd";
import VendorAdd from "../vendors/VendorAdd";
import {hideDrawer, showDrawer} from "../../../actions/drawer";
import ProjectDashboardAddTask from "./ProjectDashboardAddTask";
import PropTypes from "prop-types";
// import {getTaskCategories} from "../../../actions/tasks";
import {deleteProjectTask} from "../../../actions/projects";
import {Field} from "redux-form";
import ProjectDashboardEditTask from "./ProjectDashboardEditTask";

// const menu = (task)(
// //     <Menu>
// //         <Menu.Item key="1"><span style={{color: "#6E0001"}}><a
// //             onClick={this.props.deleteProjectTask.bind(this, task.id, task.project.id)}>Delete</a></span></Menu.Item>
// //     </Menu>
// // );


export class ProjectDashboardTimeline extends React.Component {
    static propTypes = {
        deleteProjectTask: PropTypes.func.isRequired
    };

    componentDidMount() {
    };

    DeleteTaskMenu = props => {
        const {task} = props;
        return (
            <Menu>
                <Menu.Item key="1"
                           onClick={this.props.deleteProjectTask.bind(this, task.id, task.project)}>Delete</Menu.Item>
            </Menu>
        )
    };

    render() {
        return (
            <div>
                <Row
                    style={{paddingBottom: '2rem'}}
                >
                    <Button onClick={this.props.showDrawer.bind(this, {'add_task': true})}>
                        <Icon type="plus-circle"/>
                        Add New Task
                    </Button>
                </Row>
                <DragDropContext>
                    <List bordered>
                        <Droppable droppableId="droppable-1">
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={{backgroundColor: snapshot.isDraggingOver ? 'white' : 'white'}}
                                    {...provided.droppableProps}
                                >
                                    {this.props.project.tasks.map(task => {
                                        return (
                                            <div>
                                                <Draggable draggableId={task.id} index={0}>
                                                    {(provided, snapshot) => (
                                                        <Dropdown overlay={<this.DeleteTaskMenu task={task}/>}
                                                                  trigger={['contextMenu']}>
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <List.Item actions={[
                                                                    <span>Complete {task.days_before_event_display} out</span>,
                                                                    <span>Complete by {task.due_date}</span>,
                                                                    <Button
                                                                        onClick={this.props.showDrawer.bind(this, task)}>Details</Button>,
                                                                    <Icon type="menu"/>,
                                                                ]}>
                                                                    <Checkbox/><span> </span>
                                                                    <Skeleton loading={false} active>
                                                                        <List.Item.Meta
                                                                            title={task.name}
                                                                            description=""
                                                                        />
                                                                    </Skeleton>
                                                                </List.Item>
                                                            </div>
                                                        </Dropdown>
                                                    )}
                                                </Draggable>
                                                {provided.placeholder}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </Droppable>
                    </List>
                </DragDropContext>
                {this.props.drawer.object !== null ?
                    <Drawer
                        width={840}
                        placement="right"
                        closable={true}
                        onClose={this.props.hideDrawer}
                        visible={this.props.drawer.drawer_visible}
                    >
                        {this.props.drawer.object.add_task === true ?
                            <ProjectDashboardAddTask project={this.props.project}/>
                            :
                            <ProjectDashboardEditTask task={this.props.drawer.object}/>
                        }
                    </Drawer>
                    : ''
                }
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    project: state.projects.projects.filter(project => project.id === parseInt(ownProps.match.params.id))[0],
    drawer: state.drawer,
});

export default connect(mapStateToProps, {
    showDrawer,
    hideDrawer,
    deleteProjectTask
})(ProjectDashboardTimeline);