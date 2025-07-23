'use client'

import { useState, useEffect } from 'react'
import { UserSession } from '@/lib/userSession'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface UserLoginProps {
  onUserChange?: (userId: string, userName: string) => void
}

export function UserLogin({ onUserChange }: UserLoginProps) {
  const [userName, setUserName] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState('')

  useEffect(() => {
    const currentUserId = UserSession.getUserId()
    const currentUserName = UserSession.getUserName()
    
    setUserId(currentUserId)
    setUserName(currentUserName)
    setIsLoggedIn(!!currentUserName)
    
    if (onUserChange && currentUserName) {
      onUserChange(currentUserId, currentUserName)
    }
  }, [onUserChange])

  const handleLogin = () => {
    if (userName.trim()) {
      UserSession.setUserName(userName.trim())
      setIsLoggedIn(true)
      if (onUserChange) {
        onUserChange(userId, userName.trim())
      }
    }
  }

  const handleLogout = () => {
    UserSession.clearSession()
    setIsLoggedIn(false)
    setUserName('')
    // Generate new user ID on logout
    const newUserId = UserSession.getUserId()
    setUserId(newUserId)
    if (onUserChange) {
      onUserChange(newUserId, '')
    }
  }

  if (isLoggedIn) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Sesión Activa
            <Badge variant="secondary">Conectado</Badge>
          </CardTitle>
          <CardDescription>
            Bienvenido, {userName}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              ID de Usuario: <code className="text-xs">{userId}</code>
            </p>
            <Button 
              onClick={handleLogout} 
              variant="outline" 
              className="w-full"
            >
              Cerrar Sesión
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Identificación</CardTitle>
        <CardDescription>
          Ingresa tu nombre para personalizar tu experiencia
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Tu nombre"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>
          <Button 
            onClick={handleLogin} 
            className="w-full"
            disabled={!userName.trim()}
          >
            Continuar
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Tu información se guarda localmente en tu navegador
          </p>
        </div>
      </CardContent>
    </Card>
  )
} 