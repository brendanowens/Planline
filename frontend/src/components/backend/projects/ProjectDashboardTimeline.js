import React from 'react';
import {connect} from "react-redux";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {Button, Checkbox, Drawer, Icon, List, Row, Select, Skeleton, Table} from "antd";
import VendorAdd from "../vendors/VendorAdd";
import {hideDrawer, showDrawer} from "../../../actions/drawer";
import ProjectDashboardAddTask from "./ProjectDashboardAddTask";
import PropTypes from "prop-types";
import {getTaskCategories} from "../../../actions/tasks";

export class ProjectDashboardTimeline extends React.Component {
    static propTypes = {
        task_categories: PropTypes.array,
        getTaskCategories: PropTypes.func,
    };

    componentDidMount() {
        this.props.getTaskCategories();
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
                                                                        description={task.category_object.name}
                                                                    />
                                                                </Skeleton>
                                                            </List.Item>
                                                        </div>
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
                            <div>
                                <h1>{this.props.drawer.object.name}</h1>
                            </div>
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
    task_categories: state.tasks.task_categories
});

export default connect(mapStateToProps, {showDrawer, hideDrawer, getTaskCategories})(ProjectDashboardTimeline);