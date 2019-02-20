/*global gantt*/

import React, {Component} from 'react';
import 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';

export default class Gantt extends Component {

    state = {
        tasks: {
            data: [
                {id: 1, text: 'Task #1', start_date: '15-04-2017', duration: 3, progress: 0.6},
                {id: 2, text: 'Task #2', start_date: '18-04-2017', duration: 3, progress: 0.4}
            ],
            links: [
                {id: 1, source: 1, target: 2, type: '0'}
            ]
        }
    };

    componentDidMount() {
        gantt.attachEvent('onAfterTaskAdd', (id, task) => {
            if (this.props.onTaskUpdated) {
                this.props.onTaskUpdated(id, 'inserted', task);
            }
        });

        gantt.attachEvent('onAfterTaskUpdate', (id, task) => {
            console.log('taskUpdated', id, task);
            if (this.props.onTaskUpdated) {
                this.props.onTaskUpdated(id, 'updated', task);
            }
        });

        gantt.attachEvent('onAfterTaskDelete', (id) => {
            if (this.props.onTaskUpdated) {
                this.props.onTaskUpdated(id, 'deleted');
            }
        });

        gantt.attachEvent('onAfterLinkAdd', (id, link) => {
            if (this.props.onLinkUpdated) {
                this.props.onLinkUpdated(id, 'inserted', link);
            }
        });

        gantt.attachEvent('onAfterLinkUpdate', (id, link) => {
            if (this.props.onLinkUpdated) {
                this.props.onLinkUpdated(id, 'updated', link);
            }
        });

        gantt.attachEvent('onAfterLinkDelete', (id, link) => {
            if (this.props.onLinkUpdated) {
                this.props.onLinkUpdated(id, 'deleted');
            }
        });
        gantt.init(this.ganttContainer);
        gantt.parse(this.state.tasks);
    }


    setZoom(value) {
        switch (value) {
            case 'Hours':
                gantt.config.scale_unit = 'day';
                gantt.config.date_scale = '%d %M';
                gantt.config.scale_height = 60;
                gantt.config.min_column_width = 30;
                gantt.config.subscales = [
                    {unit: 'hour', step: 1, date: '%H'}
                ];
                break;
            case 'Days':
                gantt.config.min_column_width = 70;
                gantt.config.scale_unit = "week";
                gantt.config.date_scale = "#%W";
                gantt.config.subscales = [
                    {unit: "day", step: 1, date: "%d %M"}
                ];
                gantt.config.scale_height = 60;
                break;
            case 'Months':
                gantt.config.min_column_width = 70;
                gantt.config.scale_unit = "month";
                gantt.config.date_scale = "%F";
                gantt.config.scale_height = 60;
                gantt.config.subscales = [
                    {unit: "week", step: 1, date: "#%W"}
                ];
                break;
            default:
                break;
        }
    }

    shouldComponentUpdate(nextProps) {
        return this.props.zoom !== nextProps.zoom;
    }

    componentDidUpdate() {
        gantt.render();
    }

    render() {
        this.setZoom(this.props.zoom);
        return (
            <div
                ref={(input) => {
                    this.ganttContainer = input
                }}
                style={{width: '100%', height: '100%'}}
            ></div>
        );
    }
}