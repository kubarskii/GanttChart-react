import React, {Component} from 'react';
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import Heading from "../../components/common/Heading/index"
import '../../components/common/styles/constantsStyles.scss'

export default class MainPageComponent extends Component {

    render() {
        return (
            <MDBContainer className='container-100vh' fluid>
                <hr/>
                <MDBRow>
                    <Heading title={'Проекты'}/>
                </MDBRow>
                <MDBRow>
                    <MDBCol size='2'>
                        <div>Тип проекта</div>
                        <ul>
                            <li>Внедрение</li>
                            <li>Поддержка</li>
                        </ul>
                        <div>Тип досок</div>
                        <ul>
                            <li>Канбан</li>
                            <li>Скрам</li>
                            <li>Проект</li>
                        </ul>
                    </MDBCol>
                    <MDBCol>
                        <div>Здесь будут проекты</div>
                        <table>
                            <thead>
                            <tr>
                                <th>1</th>
                                <th>2</th>
                                <th>3</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Название</td>
                                <td>Создатель</td>
                                <td>Статус</td>
                            </tr>
                            </tbody>
                        </table>
                    </MDBCol>

                </MDBRow>
            </MDBContainer>
        );
    }

}