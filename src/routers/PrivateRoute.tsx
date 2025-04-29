import React from 'react';
import { Navigate } from 'react-router-dom';
import { useIsAuth } from '../hooks/useIsAuth';
import { message } from 'antd';

interface Props {
    children: React.ReactNode;
}

function PrivateRoute({ children }: Props) {
    const isAuth = useIsAuth();
    console.log('isAuth', isAuth);
    if (isAuth) {
        return <>{children}</>;
    }
    message.warning('请先登录');
    // 否则，重定向到登录页
    return <Navigate to="/login" replace />;
}

export default PrivateRoute;