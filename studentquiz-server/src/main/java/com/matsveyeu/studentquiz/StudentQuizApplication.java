package com.matsveyeu.studentquiz;

import com.matsveyeu.studentquiz.entity.Category;
import com.matsveyeu.studentquiz.entity.Question;
import com.matsveyeu.studentquiz.entity.Quiz;
import com.matsveyeu.studentquiz.entity.User;
import com.matsveyeu.studentquiz.enums.QuestionType;
import com.matsveyeu.studentquiz.enums.UserRole;
import com.matsveyeu.studentquiz.repository.CategoryRepository;
import com.matsveyeu.studentquiz.repository.QuizRepository;
import com.matsveyeu.studentquiz.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@SpringBootApplication
public class StudentQuizApplication implements CommandLineRunner {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserRepository userRepository;

    public static void main(String[] args) {
        SpringApplication.run(StudentQuizApplication.class, args);
    }

    @Override
    public void run(String... args) {
        quizRepository.deleteAll();
        userRepository.deleteAll();

        User admin = new User.Builder()
                .setFirstName("Alex")
                .setLastName("Martin")
                .setRole(UserRole.ADMIN)
                .setEmail("alexmartin@yopmail.com")
                .setLogin("AleX")
                .setPassword("alexadm1n")
                .build();

        User teacher = new User.Builder()
                .setFirstName("Adam")
                .setLastName("Clark")
                .setRole(UserRole.TEACHER)
                .setEmail("adamclark@yopmail.com")
                .setLogin("AdamClark")
                .setPassword("adamclark")
                .build();

        User student = new User.Builder()
                .setFirstName("John")
                .setLastName("Doe")
                .setRole(UserRole.STUDENT)
                .setEmail("johndoe@yopmail.com")
                .setLogin("JohnDoe")
                .setPassword("johndoe")
                .build();

        userRepository.save(admin);
        userRepository.save(teacher);
        userRepository.save(student);

        Category category1 = new Category();
        category1.setName("Java");
        Category category2 = new Category();
        category2.setName("Javascript");
        Category category3 = new Category();
        category3.setName("Python");

        categoryRepository.save(category1);
        categoryRepository.save(category2);
        categoryRepository.save(category3);

        Question question1 = new Question();
        question1.setText("What is the size of byte variable?");
        question1.setType(QuestionType.ONE_OPTION);
        Map<String, Boolean> options1 = new HashMap<>();
        options1.put("8 bit", true);
        options1.put("16 bit", false);
        options1.put("32 bit", false);
        options1.put("64 bit", false);
        question1.setOptions(options1);

        Question question2 = new Question();
        question2.setText("What is synchronization?");
        question2.setType(QuestionType.ONE_OPTION);
        Map<String, Boolean> options2 = new HashMap<>();
        options2.put("Synchronization is the process of writing the state of an object to another object", false);
        options2.put("Synchronization is the capability to control the access of multiple threads to shared resources", true);
        options2.put("Synchronization is the process of writing the state of an object to byte stream", false);
        question2.setOptions(options2);

        Question question3 = new Question();
        question3.setText("What is the size of int variable?");
        question3.setType(QuestionType.ONE_OPTION);
        Map<String, Boolean> options3 = new HashMap<>();
        options3.put("8 bit", false);
        options3.put("16 bit", false);
        options3.put("32 bit", true);
        options3.put("64 bit", false);
        question3.setOptions(options3);

        Question question4 = new Question();
        question4.setText("Method Overriding is an example of");
        question4.setType(QuestionType.ONE_OPTION);
        Map<String, Boolean> options4 = new HashMap<>();
        options4.put("Static Binding", true);
        options4.put("Dynamic Binding", false);
        options4.put("Parallel Binding", false);
        question4.setOptions(options4);

        Question question5 = new Question();
        question5.setText("What is function overloading?");
        question5.setType(QuestionType.ONE_OPTION);
        Map<String, Boolean> options5 = new HashMap<>();
        options5.put("Methods with same name but different parameters", true);
        options5.put("Methods with same name but different return types", false);
        options5.put("Methods with same name, same parameter types but different parameter names", false);
        question5.setOptions(options5);

        Set<Question> questions = new HashSet<>();
        questions.add(question1);
        questions.add(question2);
        questions.add(question3);
        questions.add(question4);
        questions.add(question5);

        Quiz quiz = new Quiz();
        quiz.setCategory(category1);
        quiz.setName("Java quiz #1");
        quiz.setAuthor(teacher);
        quiz.setQuestions(questions);

        quizRepository.save(quiz);
    }
}