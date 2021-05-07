from rest_framework import generics, permissions
from rest_framework.response import Response 
from knox.models import AuthToken 
from .serializers import UserSerializer, RegisterSerializer,LoginSerializer
 

# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self,request, *arg, **kwargs):

        datos = {
            "username": request.data.get("username"),
            "password": request.data.get("password"),
            "email": request.data.get("email")
        } 
 
        serializer = self.get_serializer(data=datos)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user) [1]
        }) 

# Login API
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer
    
    def post  (self , request, *arg, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user) [1]
        })

# Get user API 
class UserAPI(generics.RetrieveAPIView):
    permission_classes=[
        permissions.IsAuthenticated,
    ]

    serializer_class= UserSerializer

    def get_object(self):
        return self.request.user
 