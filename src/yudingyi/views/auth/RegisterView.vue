<template>
    <div class="register-container">
        <div class="register-box">
            <div class="register-logo">
                <a href="#">
                    <img src="../../../assets/logo.png" alt="logo">
                </a>
            </div>
            <div class="register-form">
                <h2>用户注册</h2>
              <el-form ref="registrationForm" :model="formData" :rules="formRules" label-width="80px">
                <el-form-item label="角色选择" prop="role">
                  <el-radio-group v-model="formData.role" @change="handleRoleChange">
                    <el-radio label="学生" :value="'学生'">学生</el-radio>
                    <el-radio label="总结评委" :value="'总结评委'">总结评委</el-radio>
                    <el-radio label="竞赛评委" :value="'竞赛评委'">竞赛评委</el-radio>
                    <el-radio label="科研评委" :value="'科研评委'">科研评委</el-radio>
                    <el-radio label="志愿评委" :value="'志愿评委'">志愿评委</el-radio>
                    <el-radio label="岗位评委" :value="'岗位评委'">岗位评委</el-radio>
                    <el-radio label="实践评委" :value="'实践评委'">实践评委</el-radio>
                    <el-radio label="学工管理员" :value="'学工管理员'">学工管理员</el-radio>
                  </el-radio-group>
                </el-form-item>

                <el-form-item v-if="formData.role === '学生'" label="学生信息">
                  <el-input v-model="studentFormData.cardId" placeholder="请输入学生证件号" :rules="formRules['studentFormData.cardId']"></el-input>
                  <el-input v-model="studentFormData.name" placeholder="请输入学生姓名" :rules="formRules['studentFormData.name']"></el-input>
                  <el-input v-model="studentFormData.password" placeholder="请输入密码" :rules="formRules['studentFormData.password']"></el-input>
                  <el-date-picker v-model="studentFormData.birthday" type="date" placeholder="请选择学生生日" :rules="formRules['studentFormData.birthday']"></el-date-picker>
                  <el-select v-model="studentFormData.gender" placeholder="请选择学生性别" :rules="formRules['studentFormData.gender']">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                  </el-select>
                  <el-input v-model="studentFormData.phone" placeholder="请输入学生手机号" :rules="formRules['studentFormData.phone']"></el-input>
                  <el-input v-model="studentFormData.email" placeholder="请输入学生邮箱" :rules="formRules['studentFormData.email']"></el-input>
                  <el-input v-model="studentFormData.school" placeholder="请输入学生所在学院" :rules="formRules['studentFormData.school']"></el-input>
                  <el-input v-model="studentFormData.grade" placeholder="请输入学生年级" :rules="formRules['studentFormData.grade']"></el-input>
                  <el-input v-model="studentFormData.stuClass" placeholder="请输入学生班级" :rules="formRules['studentFormData.stuClass']"></el-input>
                  <el-input v-model="studentFormData.major" placeholder="请输入学生专业" :rules="formRules['studentFormData.major']"></el-input>
                </el-form-item>

                <el-form-item v-if="formData.role !== '学生'" label="教职工信息">
                  <el-input v-model="facultyFormData.cardId" placeholder="请输入教职工证件号" :rules="formRules['facultyFormData.cardId']"></el-input>
                  <el-input v-model="facultyFormData.name" placeholder="请输入教职工姓名" :rules="formRules['facultyFormData.name']"></el-input>
                  <el-input v-model="facultyFormData.password" placeholder="请输入密码" :rules="formRules['facultyFormData.password']"></el-input>
                  <el-date-picker v-model="facultyFormData.birthday" type="date" placeholder="请选择教职工生日" :rules="formRules['facultyFormData.birthday']"></el-date-picker>
                  <el-select v-model="facultyFormData.gender" placeholder="请选择教职工性别" :rules="formRules['facultyFormData.gender']">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                  </el-select>
                  <el-input v-model="facultyFormData.phone" placeholder="请输入教职工手机号" :rules="formRules['facultyFormData.phone']"></el-input>
                  <el-input v-model="facultyFormData.email" placeholder="请输入教职工邮箱" :rules="formRules['facultyFormData.email']"></el-input>
                  <el-input v-model="facultyFormData.depart" placeholder="请输入教职工所在部门" :rules="formRules['facultyFormData.depart']"></el-input>
                  <el-input v-model="facultyFormData.job" placeholder="请输入教职工职位" :rules="formRules['facultyFormData.job']"></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="do_register">注册</el-button>
                  <el-button type="primary" @click="$router.push('/login')">返回</el-button>
                </el-form-item>
              </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import {register} from '@/yudingyi/api/register.js'
export default {
    data() {
        return {
          formData: {
            role: '',
          },
          studentFormData: {
            cardId: '',
            name: '',
            role: '',
            password: '',
            birthday: '',
            gender: '',
            phone: '',
            email: '',
            school: '',
            grade: '',
            stuClass: '',
            major: '',
          },
          facultyFormData: {
            cardId: '',
            name: '',
            role: '',
            password: '',
            birthday: '',
            gender: '',
            phone: '',
            email: '',
            depart: '',
            job: '',
          },
          formRules: {
            role: [
              { required: true, message: '请选择角色', trigger: 'change' }
            ],
            'studentFormData.cardId': [
              { required: true, message: '请输入学生证件号', trigger: 'blur' }
            ],
            'studentFormData.name': [
              { required: true, message: '请输入学生姓名', trigger: 'blur' }
            ],
            'studentFormData.password': [
              { required: true, message: '请输入密码', trigger: 'blur' }
            ],
            'studentFormData.birthday': [
              { required: true, message: '请选择学生生日', trigger: 'change' }
            ],
            'studentFormData.gender': [
              { required: true, message: '请选择学生性别', trigger: 'change' }
            ],
            'studentFormData.phone': [
              { required: true, message: '请输入学生手机号', trigger: 'blur' },
              { pattern: /^1[0-9]{10}$/, message: '请输入有效的手机号', trigger: 'blur' }
            ],
            'studentFormData.email': [
              { required: true, message: '请输入学生邮箱', trigger: 'blur' },
              { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
            ],
            'studentFormData.school': [
              { required: true, message: '请输入学生所在学院', trigger: 'blur' }
            ],
            'studentFormData.grade': [
              { required: true, message: '请输入学生年级', trigger: 'blur' }
            ],
            'studentFormData.stuClass': [
              { required: true, message: '请输入学生班级', trigger: 'blur' }
            ],
            'studentFormData.major': [
              { required: true, message: '请输入学生专业', trigger: 'blur' }
            ],
            'facultyFormData.cardId': [
              { required: true, message: '请输入教职工证件号', trigger: 'blur' }
            ],
            'facultyFormData.name': [
              { required: true, message: '请输入教职工姓名', trigger: 'blur' }
            ],
            'facultyFormData.password': [
              { required: true, message: '请输入密码', trigger: 'blur' }
            ],
            'facultyFormData.birthday': [
              { required: true, message: '请选择教职工生日', trigger: 'change' }
            ],
            'facultyFormData.gender': [
              { required: true, message: '请选择教职工性别', trigger: 'change' }
            ],
            'facultyFormData.phone': [
              { required: true, message: '请输入教职工手机号', trigger: 'blur' },
              { pattern: /^1[0-9]{10}$/, message: '请输入有效的手机号', trigger: 'blur' }
            ],
            'facultyFormData.email': [
              { required: true, message: '请输入教职工邮箱', trigger: 'blur' },
              { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
            ],
            'facultyFormData.depart': [
              { required: true, message: '请输入教职工所在部门', trigger: 'blur' }
            ],
            'facultyFormData.job': [
              { required: true, message: '请输入教职工职位', trigger: 'blur' }
            ]
          },
            loading: false
        }
    },
    methods: {
      do_register() {
          this.$refs.registrationForm.validate(valid => {
              if (valid) {
                  this.loading = true
                let roleForm;
                let path;
                if(this.formData.role === '学生'){
                  this.studentFormData.role = this.formData.role;
                  roleForm = this.studentFormData;
                  console.log(this.studentFormData);
                  path = '/auth/studentRegister'
                }else{
                  this.facultyFormData.role = this.formData.role;
                  console.log(this.facultyFormData);
                  roleForm = this.facultyFormData;
                  path = '/auth/facultyRegister'
                }
                  // 发起网络请求，注册，如果注册成功，跳转到登录页面
                  register(roleForm, path).then(res =>{
                      console.log(res.code)
                      console.log(res.msg)
                      console.log(res.data)
                      if(res.code !== 200){
                          // 登录失败，显示错误提示
                          this.$message.error('用户已存在')
                          this.loading = false
                      }
                      else {
                        this.$message.success('注册成功')
                        this.$router.push({ path: '/login' })
                      }
                  }).catch(() => {
                      // 登录失败，显示错误提示
                      this.$message.error('用户已存在')
                      this.loading = false
                  })
              }
          })
      },
      handleRoleChange() {
        // Reset form data based on role
        if (this.formData.role === 'student') {
          this.studentFormData.name = '';
          this.studentFormData.cardId = '';
          this.studentFormData.password = '';
          this.studentFormData.birthday = '';
          this.studentFormData.gender = '';
          this.studentFormData.phone = '';
          this.studentFormData.email = '';
          this.studentFormData.school = '';
          this.studentFormData.grade = '';
          this.studentFormData.stuClass = '';
          this.studentFormData.major = '';
        } else if (this.formData.role === 'faculty') {
          this.facultyFormData.name = '';
          this.facultyFormData.cardId = '';
          this.facultyFormData.password = '';
          this.facultyFormData.birthday = '';
          this.facultyFormData.gender = '';
          this.facultyFormData.phone = '';
          this.facultyFormData.email = '';
          this.facultyFormData.depart = '';
          this.facultyFormData.job = '';
        }
      },
    }
}
</script>

<style lang="scss">
.register-container {
  margin-top: 10vh;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .register-box {
    width: 400px;
    height: 600px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px #ccc;

    .register-logo {
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        height: 80%;
      }
    }

    .register-form {
      padding: 20px;

      h3 {
        font-size: 24px;
        margin-bottom: 20px;
        text-align: center;
      }
    }
  }
}
</style>
