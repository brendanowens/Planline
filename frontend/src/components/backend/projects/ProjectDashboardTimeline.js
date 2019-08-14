import React from 'react';
import {connect} from "react-redux";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {Button, Checkbox, Collapse, Drawer, Dropdown, Form, Icon, List, Menu, Row, Select, Skeleton, Table} from "antd";
import {hideDrawer, showDrawer} from "../../../actions/drawer";
import ProjectDashboardAddTask from "./ProjectDashboardAddTask";
import PropTypes from "prop-types";
import {deleteProjectTask} from "../../../actions/projects";
import ProjectDashboardEditTask from "./ProjectDashboardEditTask";

const {Panel} = Collapse;


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
                    <List>
                        <Droppable droppableId="droppable-1">
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={{backgroundColor: snapshot.isDraggingOver ? 'white' : 'white'}}
                                    {...provided.droppableProps}
                                >
                                    {this.props.month_list.map(month => {
                                        return (
                                            <div>
                                                <h2>Complete {month} months out</h2>
                                                <hr/>
                                                {this.props.parent_tasks.filter(task => task.months_before_event === month).map(task => {
                                                    return (
                                                        <div>
                                                            <Draggable draggableId={task.id} index={0}>
                                                                {(provided, snapshot) => (
                                                                    <Dropdown
                                                                        overlay={<this.DeleteTaskMenu task={task}/>}
                                                                        trigger={['contextMenu']}>
                                                                        <div
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                        >
                                                                            <List.Item
                                                                                actions={[
                                                                                    <span>{task.children_count} subtasks</span>,
                                                                                    <Button
                                                                                        onClick={this.props.showDrawer.bind(this, task)}>Details</Button>,
                                                                                    <Icon type="menu"/>,
                                                                                ]}
                                                                            >
                                                                                <Collapse bordered={false}
                                                                                          style={{width: '100%'}}>
                                                                                    <Panel
                                                                                        header={task.name}
                                                                                        key="1">
                                                                                        {task.children_tasks.map(child => {
                                                                                            return (
                                                                                                <p>{child.name}</p>
                                                                                            )
                                                                                        })}
                                                                                    </Panel>
                                                                                </Collapse>
                                                                                {/*<Checkbox/><span> </span>*/}
                                                                                {/*<Skeleton loading={false} active>*/}
                                                                                {/*    <List.Item.Meta*/}
                                                                                {/*        title={task.name}*/}
                                                                                {/*        description={task.parent_task_name}*/}
                                                                                {/*    />*/}
                                                                                {/*</Skeleton>*/}
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
                                        )
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
                            <ProjectDashboardEditTask task={this.props.drawer.object} project={this.props.project}/>
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
    parent_tasks: state.projects.projects.filter(project => project.id === parseInt(ownProps.match.params.id))[0].tasks.filter(task => task.is_child === false),
    month_list: [12, 9, 6, 4, 3, 2, 1],
});

export default connect(mapStateToProps, {
    showDrawer,
    hideDrawer,
    deleteProjectTask
})(ProjectDashboardTimeline);